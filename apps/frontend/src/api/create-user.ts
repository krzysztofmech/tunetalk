import { api } from '@/lib/api-client';
import { IApiResponse } from '@/types';
import { User } from '@/types/api';
import { useMutation } from '@tanstack/react-query';

type Payload = {
  name: string;
};

const createUser = async (name: string): Promise<IApiResponse<User>> => {
  return api.post('/users', {
    name,
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (name: string) => createUser(name),
  });
};
