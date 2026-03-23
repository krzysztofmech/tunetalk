import { api } from '@/lib/api-client';
import { IApiResponse, Room } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const getRooms = async (): Promise<IApiResponse<Room[]>> => {
  return api.get('/rooms');
};

export const useGetRooms = () => {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: () => getRooms(),
  });
};
