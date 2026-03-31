import { UsersList } from '@/components/users-list';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div className="flex h-screen w-screen items-center justify-center border">
      <UsersList />
    </div>
  );
}
