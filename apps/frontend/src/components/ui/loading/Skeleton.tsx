import { cn } from '@/lib/utils/cn';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('bg-main-grey animate-pulse rounded-md', className)}
      {...props}
    />
  );
}
export { Skeleton };
