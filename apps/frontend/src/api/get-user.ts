import { api } from '@/lib/api-client';
import { User } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const getUser = async (id: string): Promise<User> => {
  return api.get(`/users/${id}`);
};

export const useGetUser = (id :string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
  });
};
