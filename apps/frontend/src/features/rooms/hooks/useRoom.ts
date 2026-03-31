import { useWebSocket } from '@/hooks';
import { api } from '@/lib/api-client';
import { IApiResponse } from '@/types';
import { useEffect, useRef, useState } from 'react';

type UseRoomProps = {
  roomId: number;
};

export const useRoom = ({ roomId }: UseRoomProps) => {
  const pc = useRef<RTCPeerConnection | null>(null);
  const { connect } = useWebSocket();
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    joinRoom();
  }, [roomId]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const joinRoom = async () => {
    try {
      setIsJoining(true);

      connect(roomId);

      if (!pc.current) {
        pc.current = new RTCPeerConnection({
          iceServers: [
            {
              urls: 'stun:stun.l.google.com:19302',
            },
          ],
        });
        pc.current.addTransceiver('audio', { direction: 'recvonly' });
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
    } finally {
      setIsJoining(false);
    }
  };

  const addListeners = () => {
    pc.current!.oniceconnectionstatechange = (e) =>
      console.log(
        'ice connection state change',
        pc.current?.iceConnectionState,
      );
    pc.current!.ontrack = (e) => {
      if (audioRef.current) {
        audioRef.current.srcObject = e.streams[0];
        return;
      }

      pc.current?.close();
      console.error('no access to audio tag');
    };
  };

  const sendOffer = async () => {
    if (pc.current!.localDescription?.sdp) {
      try {
        const response: IApiResponse<RTCSessionDescriptionInit> =
          await api.post(
            '/broadcaster',
            {
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
    isJoining,
  };
};
