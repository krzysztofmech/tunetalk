import { Button } from '@/components/ui/button/Button';
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { IApiResponse, Room } from '@/types';
import { useCreateRoom } from '../../api/create-room';

interface ControlPanelProps {}

export const ControlPanel: FC<ControlPanelProps> = () => {
  const router = useRouter();

  const { mutate: createRoom } = useCreateRoom({
    onSuccess: (data: IApiResponse<Room>) => {
      router.push(`/dashboard/room/${data.data.id}`);
    },
  });

  return (
    <div className="bg-main-background-lighter rounded px-1 py-10">
      <Button
        icon="home"
        variant="textWithIcon"
        onClick={() => router.push('/dashboard')}
      >
        Home
      </Button>
      <Button
        buttonType="click"
        onClick={() => createRoom()}
        icon="house-plus"
        variant="textWithIcon"
        className="w-full"
      >
        New Room
      </Button>
    </div>
  );
};
