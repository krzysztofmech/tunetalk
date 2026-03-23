import { UsersList } from '@/components/users-list';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('auth_cookie');

  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center border-1">
      <UsersList />
    </div>
  );
}
