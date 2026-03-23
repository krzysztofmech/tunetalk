import { api } from '@/lib/api-client';
import { IApiResponse, Room } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const getRoom = async (id: string): Promise<IApiResponse<Room>> => {
  return api.get(`/rooms/${id}`);
};

export const useGetRoom = (id: string) => {
  return useQuery({
    queryKey: ['rooms', id],
    queryFn: () => getRoom(id),
  });
};
