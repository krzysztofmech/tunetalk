import { api } from '@/lib/api-client';
import { IApiResponse, Room } from '@/types';
import { useMutation } from '@tanstack/react-query';

export const createRoom = async (): Promise<IApiResponse<Room>> => {
  return await api.post('/rooms');
};

export const useCreateRoom = ({ onSuccess }: any) => {
  return useMutation({
    mutationFn: createRoom,
    onSuccess: onSuccess,
  });
};
