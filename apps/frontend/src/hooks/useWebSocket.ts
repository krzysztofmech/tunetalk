import { useEffect, useState } from 'react';
import { useSocketContext } from '../context/Socket';
import { Signal, SignalType } from '@/constants/websocket';
import { toast } from 'sonner';
import { useMe } from '@/context/Me';

export const useWebSocket = () => {
  const { id, name } = useMe();
  const { socket, initWs, isConnected } = useSocketContext();

  const [roomId, setRoomId] = useState<number | null>(null);

  useEffect(() => {
    if (socket) {
      addListeners(socket);
    }
  }, [isConnected]);

  const addListeners = (socket: WebSocket) => {
    socket.addEventListener('open', (event) => {
      toast('connected to server', {
        position: 'bottom-left',
        duration: 5000,
      });
    });

    socket.addEventListener('message', (event) => {
      const data: Signal = JSON.parse(event.data);
      const { type, payload } = data;

      switch (type) {
        case SignalType.JOINED_ROOM:
          toast(`${name} joined the room`, {
            position: 'bottom-left',
            duration: 5000,
          });

          break;
        case SignalType.MESSAGE:
          toast(payload, {
            position: 'bottom-center',
            duration: 5000,
          });

          break;
        case SignalType.ERROR:
          toast(JSON.stringify(event.data, null, 2), {
            position: 'bottom-right',
            duration: 25000,
            closeButton: true,
          });

          break;

        default:
          console.log(
            'unidentified message received',
            JSON.stringify(event.data, null, 2),
          );
          break;
      }
    });

    socket.addEventListener('error', (error) => {
      console.error('error', error);
    });
    socket.addEventListener('close', () => {
      console.log('disconnected');
    });
  };

  const connect = (roomId: number) => {
    initWs(name, id, roomId);
    setRoomId(roomId);
  };

  const send = (payload: string, type: SignalType) => {
    if (!socket) return;
    const signal = createSignal(payload, type);
    socket.send(signal);
  };

  const createSignal = (payload: string, type: SignalType) => {
    const signal: Signal = {
      type,
      payload,
      sender: name!,
      senderId: id!,
      roomId: roomId!,
    };

    return JSON.stringify(signal);
  };

  return {
    connect,
    isConnected,
    send,
  };
};
