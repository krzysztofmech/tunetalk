'use client';

import { FC } from 'react';
import { useGetRooms } from '../../api/get-rooms';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button/Button';

interface RoomsListProps {}

export const RoomsList: FC<RoomsListProps> = ({}) => {
  const { data, isSuccess } = useGetRooms();

  const router = useRouter();

  return (
    <div className="grid grid-cols-3 gap-5">
      {isSuccess && data.data
        ? data.data.map(({ id, name }) => (
            <Button
              key={id}
              variant="secondary"
              onClick={() => {
                router.push(`/dashboard/room/${id}`);
              }}
            >
              {name}
            </Button>
          ))
        : null}
    </div>
  );
};
