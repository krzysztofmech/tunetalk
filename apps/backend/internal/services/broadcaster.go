package services

import (
	"context"
	"errors"
	"fmt"
	"io"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	"github.com/pion/webrtc/v4"
	"github.com/pion/webrtc/v4/pkg/media"
	"github.com/pion/webrtc/v4/pkg/media/oggreader"
)

type bufferedPage struct {
	payload  []byte
	duration time.Duration
	granule  uint64
}

type oggTrack struct {
	serial uint32
	header *oggreader.OggHeader
	tags   *oggreader.OpusTags

	title   string
	artist  string
	vendor  string
	pages   []bufferedPage
	runtime time.Duration
}

const (
	artist = "me"
	title  = "my-song"
)

type ConnectParams struct {
	SDP string `json:"sdp"`
}

type BroadcasterService struct {
}

func NewBroadcasterService() *BroadcasterService {
	return &BroadcasterService{}
}

func (s *BroadcasterService) CreateAnswer(ctx context.Context, params ConnectParams) (*webrtc.SessionDescription, error) {
	offer := webrtc.SessionDescription{Type: webrtc.SDPTypeOffer, SDP: params.SDP}

	track, err := getTrack()
	if err != nil {
		return nil, fmt.Errorf("CreateAnswer - failed to get track:%w", err)
	}

	answer, err := handleOffer(offer, track)
	if err != nil {
		return nil, fmt.Errorf("CreateAnswer - failed to create an answer: %w", err)
	}

	return answer, nil
}

func getTrack() (*oggTrack, error) {
	inputFileName := fmt.Sprintf("%s.mp3", title)

	wd, err := os.Getwd()
	if err != nil {
		return nil, fmt.Errorf("getTrack - failed to get work dir: %w", err)
	}

	input := filepath.Join(wd, "resources", inputFileName)

	if _, err := os.Stat(input); err != nil {
		return nil, fmt.Errorf("input file does not exist: %w", err)
	}

	outputFileName := fmt.Sprintf("%s.ogg", title)
	output := filepath.Join(os.TempDir(), outputFileName)

	cmd := exec.Command("ffmpeg", getArgs(input, output)...)

	if err := cmd.Run(); err != nil {
		return nil, fmt.Errorf("GetTrack failed ffmpeg - %w", err)
	}

	track, err := parseTrack(output)
	if err != nil {
		return nil, fmt.Errorf("GetTrack failed to parseTrack - %w", err)
	}

	return track, nil
}

func getArgs(input string, output string) []string {
	args := []string{}

	args = append(args, "-i", input, "-vn", "-c:a", "libopus", "-ac", "2", "-frame_duration", "20", "-page_duration", "20000", "-map_metadata", "-1", output)

	return args
}

func parseTrack(path string) (*oggTrack, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, fmt.Errorf("parseSong - failed to open a file: %w", err)
	}
	defer func() {
		if cErr := file.Close(); cErr != nil {
			log.Printf("parseSong - failed to close ogg file: %v\n", cErr)
		}
	}()

	reader, err := oggreader.NewWithOptions(file, oggreader.WithDoChecksum(false))
	if err != nil {
		return nil, fmt.Errorf("parseSong - failed to create an oggreader: %w", err)
	}

	track := &oggTrack{}
	var lastGranule uint64

	for {
		payload, pageHeader, parseErr := reader.ParseNextPage()
		if errors.Is(parseErr, io.EOF) {
			break
		}
		if parseErr != nil {
			return nil, fmt.Errorf("parseSong - failed to ParseNextPage :%w", parseErr)
		}

		if track.serial == 0 {
			track.serial = pageHeader.Serial
			track.title = fmt.Sprintf("serial-%d", pageHeader.Serial)
		}

		if headerType, ok := pageHeader.HeaderType(payload); ok {
			switch headerType {
			case oggreader.HeaderOpusID:
				header, headerErr := oggreader.ParseOpusHead(payload)
				if headerErr != nil {
					return nil, fmt.Errorf("parseTrack OpusHead: %w", headerErr)
				}
				track.header = header
				continue
			case oggreader.HeaderOpusTags:
				tags, tagErr := oggreader.ParseOpusTags(payload)
				if tagErr != nil {
					return nil, fmt.Errorf("parseTrack OpusTags: %w", tagErr)
				}
				track.tags = tags
				track.title, track.artist = extractMetadata(tags)
				if track.vendor == "" {
					track.vendor = tags.Vendor
				}
				continue
			}
		}

		if track.header == nil {
			continue
		}

		duration := pageDuration(track.header, pageHeader.GranulePosition, lastGranule)
		lastGranule = pageHeader.GranulePosition
		track.pages = append(track.pages, bufferedPage{
			payload:  payload,
			duration: duration,
			granule:  pageHeader.GranulePosition,
		})
		track.runtime += duration
	}

	return track, nil
}

func extractMetadata(tags *oggreader.OpusTags) (title, artist string) {
	for _, c := range tags.UserComments {
		switch strings.ToLower(c.Comment) {
		case "title":
			title = c.Value
		case "artist":
			artist = c.Value
		}
	}

	return title, artist
}

func pageDuration(header *oggreader.OggHeader, granule, last uint64) time.Duration {
	sampleRate := header.SampleRate
	if sampleRate == 0 {
		sampleRate = 48000
	}

	if granule <= last {
		return 20 * time.Millisecond
	}

	sampleCount := int64(granule - last) //nolint:gosec
	if sampleCount <= 0 {
		return 20 * time.Millisecond
	}

	ns := float64(sampleCount) / float64(sampleRate) * float64(time.Second)

	return time.Duration(ns)
}

func handleOffer(offer webrtc.SessionDescription, track *oggTrack) (*webrtc.SessionDescription, error) {
	peerConnection, err := webrtc.NewPeerConnection(webrtc.Configuration{
		ICEServers: []webrtc.ICEServer{{
			URLs: []string{"stun:stun.l.google.com:19302"},
		}},
	})
	if err != nil {
		return nil, fmt.Errorf("handleOffer: failed to create new peer connection %w", err)
	}

	iceConnectedCtx, iceConnectedCtxCancel := context.WithCancel(context.Background())
	disconnectCtx, disconnectCtxCancel := context.WithCancel(context.Background())
	setupComplete := false
	defer func() {
		if !setupComplete {
			iceConnectedCtxCancel()
			disconnectCtxCancel()
		}
	}()

	audioTrack, err := webrtc.NewTrackLocalStaticSample(
		webrtc.RTPCodecCapability{MimeType: webrtc.MimeTypeOpus},
		artist,
		title,
	)
	if err != nil {
		return nil, fmt.Errorf("handleOffer: failed to create audioTrack  %w", err)
	}

	rtpSender, err := peerConnection.AddTrack(audioTrack)
	if err != nil {
		return nil, fmt.Errorf("handleOffer: failed to add a track to peerConnection %w", err)
	}

	go func() {
		rtcpBuf := make([]byte, 1500)
		for {
			if _, _, rtcpErr := rtpSender.Read(rtcpBuf); rtcpErr != nil {
				return
			}
		}
	}()

	peerConnection.OnICEConnectionStateChange(func(connectionState webrtc.ICEConnectionState) {
		fmt.Printf("Connection State has changed %s\n", connectionState.String())
		if connectionState == webrtc.ICEConnectionStateConnected {
			iceConnectedCtxCancel()
		}
	})

	peerConnection.OnConnectionStateChange(func(state webrtc.PeerConnectionState) {
		fmt.Printf("Peer Connection State has changed: %s\n", state.String())

		if state == webrtc.PeerConnectionStateFailed || state == webrtc.PeerConnectionStateClosed {
			disconnectCtxCancel()
		}
	})

	go func() {
		<-iceConnectedCtx.Done()
		stream(track, audioTrack, disconnectCtx)
	}()

	go func() {
		<-disconnectCtx.Done()
		if closeErr := peerConnection.Close(); closeErr != nil {
			fmt.Printf("cannot close peerConnection: %v\n", closeErr)
		}
	}()

	if err = peerConnection.SetRemoteDescription(offer); err != nil {
		return nil, fmt.Errorf("handleOffer: set remote description %w", err)
	}

	answer, err := peerConnection.CreateAnswer(nil)
	if err != nil {
		return nil, fmt.Errorf("handleOffer: failed to create answer %w", err)
	}

	gatherComplete := webrtc.GatheringCompletePromise(peerConnection)

	if err = peerConnection.SetLocalDescription(answer); err != nil {
		return nil, fmt.Errorf("handleOffer: failed to set local description %w", err)
	}

	<-gatherComplete
	setupComplete = true

	return peerConnection.LocalDescription(), nil
}

func stream(track *oggTrack, audioTrack *webrtc.TrackLocalStaticSample, disconnectCtx context.Context) {
	for {
		select {
		case <-disconnectCtx.Done():
			return
		default:
		}

		for i := 0; i < len(track.pages); i++ {
			page := track.pages[i]

			if err := audioTrack.WriteSample(media.Sample{Data: page.payload, Duration: page.duration}); err != nil {
				if errors.Is(err, io.ErrClosedPipe) {
					return
				}
				panic(err)
			}

			wait := time.After(page.duration)
			select {
			case <-disconnectCtx.Done():
				return
			case <-wait:
			}
		}
	}
}
