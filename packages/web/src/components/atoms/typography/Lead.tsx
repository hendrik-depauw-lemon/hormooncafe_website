import { PropsWithChildren } from 'react';

import { cn } from '../../../shadcn/lib/utils';

type LeadProps = PropsWithChildren & {
    className?: string;
};

export function Lead({ children, className }: LeadProps) {
    return (
        <p className={cn('text-muted-foreground text-xl leading-normal', className)}>{children}</p>
    );
}
