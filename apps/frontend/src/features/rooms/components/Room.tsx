import { FC } from 'react';
import { Banner } from './Banner';
import { useGetRoom } from '../api/get-room';
import { useRoom } from '../hooks/useRoom';

interface RoomProps {
  id: number;
}

export const Room: FC<RoomProps> = ({ id }) => {
  const {
    data: roomData,
    isLoading: isDataLoading,
  } = useGetRoom(id);
  const { audioRef, isJoining } = useRoom({ roomId: id });

  const { data } = roomData ?? {};
  const isLoading = isDataLoading || isJoining;

  return (
    <div>
      <Banner
        id={id}
        name={data?.name || ''}
        creatorName={data?.creator_name || ''}
        isLoading={isLoading}
      />
      <audio ref={audioRef} autoPlay />
    </div>
  );
};
