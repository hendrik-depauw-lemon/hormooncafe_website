import { PropsWithChildren } from 'react';

import { cn } from '../../../shadcn/lib/utils';

type CaptionProps = PropsWithChildren & {
    className?: string;
};

export function Caption({ children, className }: CaptionProps) {
    return (
        <p
            className={cn(
                'text-foreground font-aeonik text-xs font-medium tracking-wide',
                className,
            )}
        >
            {children}
        </p>
    );
}
