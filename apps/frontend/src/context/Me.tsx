import { api } from '@/lib/api-client';
import { IApiResponse } from '@/types';
import { User } from '@/types/api';
import { createContext, FC, ReactNode, useContext, useState } from 'react';

type MeContextProps = {
  children: ReactNode;
};

type MeContextValue = {
  id: number;
  name: string;
  login: (id: number) => Promise<boolean>;
};

const MeContext = createContext<MeContextValue | null>(null);

export const Me: FC<MeContextProps> = ({ children }) => {
  const [id, setId] = useState(0);
  const [name, setName] = useState('');

  const login = async (id: number) => {
    const { data, success }: IApiResponse<User> = await api.get(
      `/users/login/${id}`,
    );

    if (success) {
      setId(data.id);
      setName(data.name);
    }

    return success;
  };

  return (
    <MeContext.Provider
      value={{
        id: id,
        name: name,
        login,
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
