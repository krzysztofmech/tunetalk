import { UsersList } from '@/components/users-list';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { getCookies } from '@tanstack/react-start/server';

const checkCookies = createServerFn().handler(async () => {
  const cookies = getCookies();
  if (cookies && cookies.auth_cookie) {
    throw redirect({ to: '/dashboard' });
  }
});

export const Route = createFileRoute('/')({
  component: Home,
  loader: () => checkCookies(),
});

function Home() {
  return (
    <div className="flex h-screen w-screen items-center justify-center border">
      <UsersList />
    </div>
  );
}
