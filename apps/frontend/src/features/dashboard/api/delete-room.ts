import { api } from '@/lib/api-client';
import { IApiResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';

export const deleteRoom = async (id: string): Promise<IApiResponse<null>> => {
  return api.delete(`/rooms/${id}`);
};

export const useDeleteRoom = () => {
  return useMutation({
    mutationFn: async (id: string) => deleteRoom(id),
  });
};
