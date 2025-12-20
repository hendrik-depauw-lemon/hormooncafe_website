import { PropsWithChildren } from 'react';

import { cn } from '../../../shadcn/lib/utils';

type MutedProps = PropsWithChildren & { className?: string };

export function Muted({ children, className }: MutedProps) {
    return <p className={cn(`text-muted-foreground text-sm`, className)}>{children}</p>;
}
