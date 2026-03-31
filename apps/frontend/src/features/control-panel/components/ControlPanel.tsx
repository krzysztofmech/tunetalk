import { Button } from '@/components/ui/button/Button';
import { FC } from 'react';
import { IApiResponse, Room } from '@/types';
import { useNavigate } from '@tanstack/react-router';
import { Home, HousePlus } from 'lucide-react';
import { useCreateRoom } from '../api/create-room';

interface ControlPanelProps {}

export const ControlPanel: FC<ControlPanelProps> = () => {
  const navigate = useNavigate();

  const { mutate: createRoom } = useCreateRoom({
    onSuccess: (data: IApiResponse<Room>) => {
      navigate({
        to: `/dashboard/rooms/${data.data.id}`,
      });
    },
  });

  return (
    <div className="bg-main-background-lighter rounded px-1 py-10">
      <Button
        Icon={Home}
        variant="textWithIcon"
        onClick={() =>
          navigate({
            to: '/dashboard',
          })
        }
      >
        Home
      </Button>
      <Button
        buttonType="click"
        onClick={() => createRoom()}
        Icon={HousePlus}
        variant="textWithIcon"
        className="w-full"
      >
        New Room
      </Button>
    </div>
  );
};
