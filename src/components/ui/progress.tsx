import { forwardRef, Ref } from 'preact/compat';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@/lib/utils';

// Define the Progress component using forwardRef
const Progress = forwardRef<
  // @ts-ignore
  ProgressPrimitive.ProgressBarElement,
  Omit<JSX.IntrinsicElements['div'], 'ref'> & { value?: number }
>(({ className, value = 0, ...props }, ref: Ref<HTMLDivElement>) => (
  // @ts-ignore
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - value}%)` }}
    />
  </ProgressPrimitive.Root>
));

Progress.displayName = 'Progress';

export { Progress };
