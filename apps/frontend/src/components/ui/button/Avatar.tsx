import Image from 'next/image';
import { FC } from 'react';

interface AvatarProps {}

export const Avatar: FC<AvatarProps> = ({}) => {
  return <Image src="/avatar.svg" alt="Avatar picture" width={50} height={50}/>;
};
