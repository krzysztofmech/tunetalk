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
      return () => removeListeners(socket);
    }
  }, [isConnected]);

  const addListeners = (socket: WebSocket) => {
    socket.addEventListener('open', onOpen);

    socket.addEventListener('message', onMessage);

    socket.addEventListener('error', onError);

    socket.addEventListener('close', onClose);
  };

  const onOpen = () => {
    toast('connected to server', {
      position: 'bottom-left',
      duration: 5000,
    });
  };

  const onMessage = (event: MessageEvent) => {
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
  };

  const onError = (event: Event) => {
    console.error('error', event);
  };

  const onClose = () => {
    console.log('disconnected');
  };

  const removeListeners = (socket: WebSocket) => {
    socket.removeEventListener('open', onOpen);
    socket.removeEventListener('message', onMessage);
    socket.removeEventListener('error', onError);
    socket.removeEventListener('close', onClose);
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
      sender: name,
      senderId: id,
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
