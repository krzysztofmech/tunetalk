'use client';
import { Socket } from '@/context/Socket';
import { FC, ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';

interface ClientProvidersProps {
  children: ReactNode;
}

export const ClientProviders: FC<ClientProvidersProps> = ({ children }) => {
  return (
    <QueryProvider>
      <Socket>{children}</Socket>
    </QueryProvider>
  );
};
