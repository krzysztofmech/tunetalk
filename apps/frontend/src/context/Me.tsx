import { User } from '@/types/api';
import { createContext, FC, ReactNode, useContext, useRef } from 'react';

type MeContextProps = {
  children: ReactNode;
};

type MeContextValue = {
  id: string | null;
  name: string | null;
  setMe: (user: User) => void;
};

const MeContext = createContext<MeContextValue | null>(null);

export const Me: FC<MeContextProps> = ({ children }) => {
  const id = useRef<string | null>(null);
  const name = useRef<string | null>(null);

  const setMe = (user: User) => {
    id.current = user.id;
    name.current = user.name;
  };

  return (
    <MeContext.Provider
      value={{
        id: id.current,
        name: name.current,
        setMe,
      }}
    >
      {children}
    </MeContext.Provider>
  );
};
export const useMe = () => {
  const context = useContext(MeContext);

  if (!context) {
    throw new Error('useMe must be used within an MeProvider');
  }

  return context;
};
