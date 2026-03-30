import { useGetMe } from '@/api/me';
import { IApiResponse } from '@/types';
import { User } from '@/types/api';
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from '@tanstack/react-query';
import { createContext, FC, ReactNode, useContext } from 'react';

type MeContextProps = {
  children: ReactNode;
};

type MeContextValue = {
  id: number | null;
  name: string | null;
  isLoading: boolean;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<IApiResponse<User>, unknown>>;
};

const MeContext = createContext<MeContextValue | null>(null);

export const Me: FC<MeContextProps> = ({ children }) => {
  const { data, isLoading, refetch } = useGetMe();

  return (
    <MeContext.Provider
      value={{
        id: data?.data.id || null,
        name: data?.data.name || null,
        isLoading,
        refetch,
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
