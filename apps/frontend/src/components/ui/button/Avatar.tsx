import { Image } from '@unpic/react';
import { FC } from 'react';

interface AvatarProps {}

export const Avatar: FC<AvatarProps> = ({}) => {
  return (
    <Image src="/avatar.svg" alt="Avatar picture" width={50} height={50} />
  );
};
