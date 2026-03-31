import { api } from '@/lib/api-client';
import { IApiResponse } from '@/types';

export const login = (id: number): Promise<IApiResponse<null>> => {
  return api.get(`/users/login/${id}`);
};
