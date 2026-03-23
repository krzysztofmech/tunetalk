import { Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';
import { Dialog as DialogPrimitive } from '@base-ui/react';
import { Button } from './button/Button';

interface DialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  title?: ReactNode | string;
  description?: ReactNode | string;
  showCloseButton?: boolean;
}

export const Dialog: FC<DialogProps> = ({
  isOpen,
  setIsOpen,
  title,
  description,
  children,
  showCloseButton = true,
}) => {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop
          className="bg-main-background-less-transparent
            data-open:animate-fade-in data-closed:animate-fade-out fixed
            inset-0"
        />
        <DialogPrimitive.Popup
          className="bg-main-background-lighter data-open:animate-fade-in
            data-closed:animate-fade-out fixed top-1/2 left-1/2 min-w-1/3
            -translate-x-1/2 -translate-y-1/2 rounded px-8 py-5"
        >
          <DialogPrimitive.Title
            className="flex justify-between text-2xl font-bold"
          >
            {title}
            {showCloseButton && (
              <div>
                <DialogPrimitive.Close
                  render={<Button icon="x" variant="icon" />}
                ></DialogPrimitive.Close>
              </div>
            )}
          </DialogPrimitive.Title>
          {description && (
            <DialogPrimitive.Description>
              {description}
            </DialogPrimitive.Description>
          )}
          {children}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
