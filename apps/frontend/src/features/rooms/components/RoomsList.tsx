import { FC } from 'react';
import { Button } from '@/components/ui/button/Button';
import { useNavigate } from '@tanstack/react-router';
import { useGetRooms } from '../api/get-rooms';

interface RoomsListProps {}

export const RoomsList: FC<RoomsListProps> = ({}) => {
  const { data, isSuccess } = useGetRooms();

  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 gap-5">
      {isSuccess && data.data
        ? data.data.map(({ id, name }) => (
            <Button
              key={id}
              variant="secondary"
              onClick={() => {
                navigate({
                  to: `/dashboard/rooms/${id}`,
                });
              }}
            >
              {name}
            </Button>
          ))
        : null}
    </div>
  );
};
