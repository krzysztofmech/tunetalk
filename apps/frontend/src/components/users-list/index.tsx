import { useGetUsers } from '@/api/get-users';
import { FC, useState } from 'react';
import { Button } from '../ui/button/Button';
import { User } from '@/types/api';
import { useCreateUser } from '@/api/create-user';
import { useNavigate } from '@tanstack/react-router';
import { LoaderCircle } from 'lucide-react';
import { useMe } from '@/context/Me';

interface UsersListProps {}

export const UsersList: FC<UsersListProps> = ({}) => {
  const { data, isLoading } = useGetUsers();
  const { login } = useMe();
  const { mutateAsync } = useCreateUser();

  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const handleAuth = async (user: User) => {
    const success = await login(user.id);

    if (success) {
      navigate({
        to: '/dashboard',
      });
    }
  };

  const handleJoin = async () => {
    const response = await mutateAsync(username);
    if (response.success) {
      await handleAuth(response.data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <>
          {!isLoading ? (
            <>
              <div className="p-5 font-bold">
                {data && data.data ? 'Pick a user' : 'Create a user'}
              </div>
              {data && data.data ? (
                <>
                  {data.data.map(({ id, name }) => (
                    <Button
                      key={id}
                      variant="secondary"
                      onClick={() => handleAuth({ id, name })}
                    >
                      {name}
                    </Button>
                  ))}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center gap-5">
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    className="peer placeholder:text-main-white ring-main-white
                      focus:ring-orange w-full appearance-none rounded-md px-5
                      py-5 text-sm font-bold text-white ring-1 transition-all
                      duration-100 outline-none hover:ring-white
                      focus:outline-none"
                  />

                  <Button onClick={() => handleJoin()}>Join</Button>
                </div>
              )}
            </>
          ) : (
            <LoaderCircle className="animate-spin" />
          )}
        </>
      </div>
    </div>
  );
};
