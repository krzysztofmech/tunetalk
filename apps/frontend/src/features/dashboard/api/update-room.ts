import { api } from '@/lib/api-client';
import { IApiResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';

export type Payload = {
  name: string;
  id: string;
};

export const updateRoom = async (
  id: string,
  name: string,
): Promise<IApiResponse<null>> => {
  return api.patch(`/rooms/${id}`, {
    name,
  });
};

export const useUpdateRoom = () => {
  return useMutation({
    mutationFn: async ({ id, name }: Payload) => updateRoom(id, name),
  });
};
