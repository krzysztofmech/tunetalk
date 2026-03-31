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
  socket: WebSocket | null;
  initWs: (name: string | null, userId: number | null, roomId: number) => void;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextValue | null>(null);

export const Socket: React.FC<SocketProps> = ({ children }) => {
  const socket = useRef<WebSocket | null>(null);
  const url = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080';
  const [isConnected, setIsConnected] = useState(false);

  const initWs = async (
    name: string | null,
    userId: number | null,
    roomId: number,
  ) => {
    if (!name || !userId) {
      return;
    }

    if (!socket.current) {
      socket.current = new WebSocket(
        `${url}/ws?name=${name}&userId=${userId}&roomId=${roomId}`,
      );
    }
    setIsConnected(true);
  };

  return (
    <SocketContext.Provider
      value={{
        socket: socket.current,
        initWs,
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
