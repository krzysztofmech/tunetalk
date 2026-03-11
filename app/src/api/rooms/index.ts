import { AxiosResponse } from 'axios';
import { instance } from '../axios';

type Room = {
  id: string;
  name: string;
};

export const getRooms = async (): Promise<Room[]> => {
  try {
    const response: AxiosResponse<Room[]> = await instance.get('/rooms');
    return response.data;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw new Error();
  }
};
