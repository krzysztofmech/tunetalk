import { useGetRoom } from '@/features/dashboard/api/get-room';
import { useGetRooms } from '@/features/dashboard/api/get-rooms';
import { Banner } from '@/features/dashboard/components';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/rooms/$id')({
  component: Room,
});

function Room() {
  const { refetch: refetchRooms } = useGetRooms();
  const { id } = Route.useParams()

  const {
    data: roomData,
    isLoading: isRoomLoading,
    refetch: refetchRoom,
  } = useGetRoom(id);

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
