import { api } from '@/lib/api-client';
import { IApiResponse } from '@/types';
import { useMutation } from '@tanstack/react-query';

export type Payload = {
  name: string;
  id: number;
};

export const updateRoom = async (
  id: number,
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
