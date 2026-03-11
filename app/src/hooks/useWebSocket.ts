import { useEffect, useRef, useState } from 'react';
import { useSocketContext } from '../context/Socket';
import { Data, MessageType } from '@/constants/websocket';
import { toast } from 'sonner';
import { v4 } from 'uuid';

export const useWebSocket = () => {
  const { socket, connect, isConnected } = useSocketContext();

  const [username, setUsername] = useState('');
  const userId = useRef(v4())
  const [roomId, setRoomId] = useState<string | null>(null);

  useEffect(() => {
    if (socket) {
      addListeners();
    }
  }, [isConnected]);

  const addListeners = () => {
    socket.addEventListener('open', (event) => {
      toast('connected to server', {
        position: 'bottom-left',
        duration: 5000,
      });
    });

    socket.addEventListener('message', (event) => {
      const data: Data = JSON.parse(event.data);
      const { type, username, payload } = data;

      switch (type) {
        case MessageType.JOINED_ROOM:
          toast(`${username} joined the room`, {
            position: 'bottom-left',
            duration: 5000,
          });

          break;
        case MessageType.MESSAGE:
          toast(payload, {
            position: 'bottom-center',
            duration: 5000,
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

  const joinRoom = (roomId: string) => {
    connect(username, userId.current, roomId);
    setRoomId(roomId);
  };

  const sendMessage = (payload: string) => {
    const message = createMessage(payload);
    socket.send(message);
  };

  const createMessage = (payload: string) => {
    const message: Data = {
      type: MessageType.MESSAGE,
      payload,
      username,
      clientId: userId.current,
      roomId: roomId!,
    };

    return JSON.stringify(message);
  };

  return {
    joinRoom,
    isConnected,
    sendMessage,
    setUsername,
  };
};
