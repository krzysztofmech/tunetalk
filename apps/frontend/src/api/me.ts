import { api } from '@/lib/api-client';
import { IApiResponse } from '@/types';

export const me = (id: string): Promise<IApiResponse<null>> => {
  return api.get(`/users/me/${id}`);
};
