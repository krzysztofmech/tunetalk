import { FC, ReactElement } from 'react';
import { Menu } from '@base-ui/react';
import { Button } from './button/Button';

export interface Action {
  title: string
  onClick: () => void;
}

interface DropdownMenuProps {
  trigger: ReactElement;
  actions: Action[];
}

export const DropdownMenu: FC<DropdownMenuProps> = ({ trigger, actions }) => {
  return (
    <Menu.Root>
      <Menu.Trigger render={trigger} />

      <Menu.Portal>
        <Menu.Positioner
          className="outline-hidden"
          sideOffset={8}
          align="start"
          side="left"
        >
          <Menu.Popup
            className="bg-main-background-darker data-open:animate-fade-in
              data-close:animate-fade-out rounded min-w-24 flex flex-col items-center px-1 py-1"
          >
            {actions.map(({title, onClick}) => (
              <Menu.Item key={title} className='w-full'>
                <Button
                  variant="secondary"
                  size='sm'
                  className="justify-start rounded w-full"
                  onClick={onClick}
                >
                  {title}
                </Button>
              </Menu.Item>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
};
