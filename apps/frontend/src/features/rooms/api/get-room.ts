import { api } from '@/lib/api-client';
import { IApiResponse, Room } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const getRoom = async (id: number): Promise<IApiResponse<Room>> => {
  return api.get(`/rooms/${id}`);
};

export const useGetRoom = (id: number) => {
  return useQuery({
    queryKey: ['rooms', id],
    queryFn: () => getRoom(id),
  });
};
