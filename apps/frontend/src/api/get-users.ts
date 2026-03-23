import { api } from '@/lib/api-client';
import { IApiResponse, User } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const getUsers = async (): Promise<IApiResponse<User[]>> => {
  return api.get('/users');
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });
};
