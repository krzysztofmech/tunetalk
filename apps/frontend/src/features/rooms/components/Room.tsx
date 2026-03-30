import { FC, useRef } from 'react';
import { Banner } from './Banner';
import { useGetRoom } from '../api/get-room';
import { useGetRooms } from '../api/get-rooms';
import { useRoom } from '../hooks/useRoom';

interface RoomProps {
  id: number;
}

export const Room: FC<RoomProps> = ({ id }) => {
  const { refetch: refetchRooms } = useGetRooms();
  const { data: roomData, isLoading, refetch: refetchRoom } = useGetRoom(id);
  const { data } = roomData ?? {};

  const { audioRef } = useRoom({ roomId: data?.id || null });

  return (
    <div>
      <Banner
        id={data?.id || 0}
        name={data?.name || ''}
        creatorName={data?.creator_name || ''}
        isLoading={isLoading}
        refetchRooms={refetchRooms}
        refetchRoom={refetchRoom}
      />
      <audio ref={audioRef} autoPlay />
    </div>
  );
};
