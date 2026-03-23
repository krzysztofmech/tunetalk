import { Avatar } from '@/components/ui/button/Avatar';
import { FC } from 'react';
import { Users, MessageCircle } from 'lucide-react';

interface HeaderProps {}

export const Header: FC<HeaderProps> = ({}) => {
  return (
    <div className="flex flex-row-reverse px-3 py-6">
      <div className="flex items-center justify-center gap-5">
        <MessageCircle />
        <Users />
        <Avatar />
      </div>
    </div>
  );
};
