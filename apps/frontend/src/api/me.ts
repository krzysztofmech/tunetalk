import { api } from '@/lib/api-client';
import { IApiResponse } from '@/types';
import { User } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

export const getMe = async (): Promise<IApiResponse<User>> => {
  return api.get(`/users/me`);
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: () => getMe()
  })
}
