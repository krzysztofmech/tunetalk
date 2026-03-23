'use client';

import { useGetRoom } from '../../api/get-room';
import { useGetRooms } from '../../api/get-rooms';
import { useRoomParams } from '../../hooks/useRoomParams';
import { Banner } from './components/banner';

export interface RoomProps {}

export default function Room() {
  const { refetch: refetchRooms } = useGetRooms();
  const params = useRoomParams();

  const {
    data: roomData,
    isLoading: isRoomLoading,
    refetch: refetchRoom,
  } = useGetRoom(params.id);

  const { data } = roomData ?? {};

  return (
    <div>
      <Banner
        id={data?.id || ''}
        name={data?.name || ''}
        creatorName={data?.creatorName || ''}
        isLoading={isRoomLoading}
        refetchRooms={refetchRooms}
        refetchRoom={refetchRoom}
      />
    </div>
  );
}
