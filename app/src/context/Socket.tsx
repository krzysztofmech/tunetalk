import React, {
  ReactNode,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react';

type SocketProps = {
  children: ReactNode;
};

type SocketContextValue = {
  socket: WebSocket;
  connect: (username: string, userId: string, roomId: string) => void;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextValue | null>(null);

export const Socket: React.FC<SocketProps> = ({ children }) => {
  const socket = useRef<any | null>(null);
  const url = process.env.WS_URL || 'ws://localhost:8080';
  const [isConnected, setIsConnected] = useState(false);

  const connect = (username: string, userId: string, roomId: string) => {
    if (!socket.current) {
      socket.current = new WebSocket(
        `${url}/ws?username=${username}&userId=${userId}&roomId=${roomId}`,
      );
    }
    setIsConnected(true);
  };

  return (
    <SocketContext.Provider
      value={{
        socket: socket.current,
        connect,
        isConnected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error('useSocketContext must be used within a SocketProvider');
  }

  return context;
};
