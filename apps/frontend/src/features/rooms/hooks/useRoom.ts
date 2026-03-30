import { useWebSocket } from '@/hooks';
import { api } from '@/lib/api-client';
import { IApiResponse } from '@/types';
import { useEffect, useRef } from 'react';

type UseRoomProps = {
  roomId: number | null;
};

export const useRoom = ({ roomId }: UseRoomProps) => {
  const pc = useRef<RTCPeerConnection | null>(null);
  const { connect, isConnected: isWsConnected } = useWebSocket();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!isWsConnected && roomId) {
      connect(roomId);
      return;
    }

    joinRoom();
  }, [isWsConnected, roomId]);

  const joinRoom = async () => {
    if (!roomId) {
      return;
    }

    try {
      pc.current = new RTCPeerConnection({
        iceServers: [
          {
            urls: 'stun:stun.l.google.com:19302',
          },
        ],
      });
      pc.current.addTransceiver('audio', { direction: 'recvonly' });

      if (pc.current) {
        addListeners();

        const offer = await pc.current.createOffer();
        await pc.current.setLocalDescription(offer);

        const answer = await sendOffer();

        if (answer && answer.sdp) {
          pc.current.setRemoteDescription({ type: 'answer', sdp: answer.sdp });
        }
      }
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const addListeners = () => {
    pc.current!.oniceconnectionstatechange = (e) =>
      console.log(
        'ice connection state change',
        pc.current?.iceConnectionState,
      );
    pc.current!.ontrack = (e) => {
      audioRef!.current!.srcObject = e.streams[0];
      audioRef!.current?.play();
    };
  };

  const sendOffer = async () => {
    if (pc.current!.localDescription?.sdp) {
      try {
        const response: IApiResponse<RTCSessionDescriptionInit> =
          await api.post(
            '/broadcaster',
            {
              room_id: roomId,
              sdp: pc.current!.localDescription.sdp,
            },
            {
              headers: { 'Content-Type': 'application/sdp' },
            },
          );
        if (response.success) {
          return response.data;
        }
        return null;
      } catch (err: any) {
        throw new Error(err);
      }
    }
  };

  return {
    joinRoom,
    audioRef,
  };
};
