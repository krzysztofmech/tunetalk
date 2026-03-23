import { AlertDialog } from '@base-ui/react';
import { Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';
import { Button } from './button/Button';
import { cn } from '@/lib/utils/cn';

export interface AlertProps {
  variant: 'danger';
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
  confirmText: string;
  title?: ReactNode | string;
  description?: ReactNode | string;
}

const variants = {
  default: `bg-main-background-lighter data-open:animate-fade-in
      data-closed:animate-fade-out fixed top-1/2 left-1/2 min-w-1/5
      -translate-x-1/2 -translate-y-1/2 rounded px-8 py-5`,
  danger: 'ring-1 ring-alert-intense',
};

export const Alert: FC<AlertProps> = ({
  variant,
  isOpen,
  setIsOpen,
  title,
  description,
  onConfirm,
  confirmText,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const popupStyles = cn(
    variants.default,
    variant === 'danger' && variants.danger,
  );

  return (
    <AlertDialog.Root open={isOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop
          className="bg-main-background-less-transparent
            data-open:animate-fade-in data-closed:animate-fade-out fixed
            inset-0"
          onClick={() => {
            setIsOpen(false);
          }}
        />
        <AlertDialog.Popup className={popupStyles}>
          <AlertDialog.Title className="flex justify-between text-2xl font-bold">
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description
            className="text-white-transparent mb-6 text-base"
          >
            {description}
          </AlertDialog.Description>
          <div className="flex justify-end gap-4">
            <AlertDialog.Close
              render={<Button onClick={() => setIsOpen(false)} variant='secondary'>Cancel</Button>}
            ></AlertDialog.Close>
            <AlertDialog.Close
              render={
                <Button
                  onClick={async () => {
                    setIsLoading(true);
                    onConfirm();
                    setIsLoading(false);
                    setIsOpen(false);
                  }}
                  loading={isLoading}
                  variant={variant === 'danger' ? variant : 'primary'}
                >
                  {confirmText}
                </Button>
              }
            />
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
