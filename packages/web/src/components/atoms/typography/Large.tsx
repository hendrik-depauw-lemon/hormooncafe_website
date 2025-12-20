import { PropsWithChildren } from 'react';

import { cn } from '../../../shadcn/lib/utils';

type LargeProps = PropsWithChildren & { className?: string };

export function Large({ children, className }: LargeProps) {
    return (
        <small className={cn(`text-lg leading-normal font-semibold`, className)}>{children}</small>
    );
}
