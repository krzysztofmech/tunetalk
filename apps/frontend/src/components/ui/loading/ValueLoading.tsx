import { FC, ReactNode, ComponentProps } from 'react';
import { Skeleton } from './Skeleton';

interface ValueLoadingProps extends ComponentProps<'div'> {
  children: ReactNode;
  isLoading: boolean;
}

export const ValueLoading: FC<ValueLoadingProps> = ({
  children,
  isLoading,
  ...props
}) => {
  return (
    <div className="relative flex items-center">
      {isLoading ? (
        <Skeleton
          {...props}
        />
      ) : (
        <div {...props} className="flex items-center">
          {children}
        </div>
      )}
    </div>
  );
};
