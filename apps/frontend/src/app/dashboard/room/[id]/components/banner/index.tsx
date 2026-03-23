import { useAppForm } from '@/form';
import { FC, FormEvent, useState } from 'react';
import { useUpdateRoom } from '@/app/dashboard/api/update-room';
import { QueryObserverResult } from '@tanstack/react-query';
import { IApiResponse, Room } from '@/types';
import { ValueLoading } from '@/components/ui/loading/ValueLoading';
import { Button } from '@/components/ui/button/Button';
import { Action, DropdownMenu } from '@/components/ui/DropdownMenu';
import { Dialog } from '@/components/ui/Dialog';
import { useDeleteRoom } from '@/app/dashboard/api/delete-room';
import { useAlert } from '@/context/Alert';
import { useRouter } from 'next/navigation';
import z from 'zod';

interface BannerProps {
  id: string;
  name: string;
  creatorName: string;
  isLoading: boolean;
  refetchRooms: <TPageData>() => Promise<
    QueryObserverResult<IApiResponse<Room[]>, unknown>
  >;
  refetchRoom: <TPageData>() => Promise<
    QueryObserverResult<IApiResponse<Room>, unknown>
  >;
}

const editRoomSchema = z.object({
  name: z.string().min(3),
});

export const Banner: FC<BannerProps> = ({
  id,
  name,
  creatorName,
  isLoading,
  refetchRoom,
  refetchRooms,
}) => {
  const { mutateAsync: updateRoom, isLoading: isUpdateRoomLoading } =
    useUpdateRoom();
  const { mutateAsync: deleteRoom } = useDeleteRoom();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const { showAlert } = useAlert();

  const router = useRouter();

  const { AppField, FormButton, AppForm, handleSubmit } = useAppForm({
    defaultValues: {
      name,
    },
    validators: {
      onSubmit: editRoomSchema,
    },
    onSubmit: async ({ value }) => {
      const response = await updateRoom({
        id,
        name: value.name,
      });

      if (response.success) {
        await refetchRooms();
        await refetchRoom();
      }

      setIsEditOpen(false);
    },
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit();
  };

  const handleDeleteRoom = async () => {
    const response = await deleteRoom(id);
    if (response.success) {
      await refetchRooms();
      router.replace('/dashboard');
    }
  };

  const actions: Action[] = [
    {
      title: 'Delete room',
      onClick: () =>
        showAlert({
          onConfirm: () => handleDeleteRoom(),
          confirmText: 'Delete',
          title: 'Deleting room',
          description: 'This cannot be undone!',
          variant: 'danger',
        }),
    },
  ];

  return (
    <div className="bg-main-background-lighter flex min-h-48 rounded px-6">
      <div className="flex grow flex-col justify-center gap-2.5">
        <ValueLoading
          isLoading={isLoading || !name}
          className="h-10 w-full rounded-full"
        >
          <div
            className="cursor-pointer text-4xl font-bold"
            onClick={() => setIsEditOpen(true)}
          >
            {name}
          </div>
        </ValueLoading>
        <ValueLoading
          isLoading={isLoading || !creatorName}
          className="h-3 w-1/6 rounded-full"
        >
          <div className="text-xs font-bold">{creatorName}</div>
        </ValueLoading>
      </div>
      <Dialog isOpen={isEditOpen} setIsOpen={setIsEditOpen} title="Edit room">
        <div className="py-5">
          <form onSubmit={(e) => onSubmit(e)}>
            <AppField
              name="name"
              children={({ TextInput }) => (
                <TextInput label="Name" placeholder="Name" smaller />
              )}
            />
            <AppForm>
              <div className="pt-5">
                <FormButton loading={isUpdateRoomLoading}>Save</FormButton>
              </div>
            </AppForm>
          </form>
        </div>
      </Dialog>
      <div className="flex flex-col justify-center">
        <DropdownMenu
          trigger={
            <Button
              icon="ellipsis-vertical"
              variant="icon"
              className="rounded-full"
            />
          }
          actions={actions}
        />
      </div>
    </div>
  );
};
