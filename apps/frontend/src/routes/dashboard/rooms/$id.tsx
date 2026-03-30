import { createFileRoute } from '@tanstack/react-router';
import { Room as RoomComponent } from '@/features/rooms/components/Room';

export const Route = createFileRoute('/dashboard/rooms/$id')({
  component: Room,
});

function Room() {
  const { id } = Route.useParams();

  return <RoomComponent id={id} />;
}
