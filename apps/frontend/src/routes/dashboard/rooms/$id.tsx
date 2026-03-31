import { createFileRoute } from '@tanstack/react-router';
import { Room as RoomComponent } from '@/features/rooms/components/Room';

export const Route = createFileRoute('/dashboard/rooms/$id')({
  component: Room,
});

function Room() {
  const params = Route.useParams();
  const id = Number(params.id);

  if (!id) {
    return null;
  }

  return <RoomComponent id={id} />;
}
