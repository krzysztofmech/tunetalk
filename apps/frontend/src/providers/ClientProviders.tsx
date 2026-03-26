import { Socket } from '@/context/Socket';
import { FC, ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';
import { Alert } from '@/context/Alert';
import { Me } from '@/context/Me';

interface ClientProvidersProps {
  children: ReactNode;
}

export const ClientProviders: FC<ClientProvidersProps> = ({ children }) => {
  return (
    <QueryProvider>
      <Me>
        <Alert>
          <Socket>{children}</Socket>
        </Alert>
      </Me>
    </QueryProvider>
  );
};
