import { PropsWithChildren } from 'react';

import { cn } from '../../../shadcn/lib/utils';

type SubtitleProps = PropsWithChildren & {
    className?: string;
};

export function Subtitle({ children, className }: SubtitleProps) {
    return <p className={cn('text-foreground text-md font-medium1', className)}>{children}</p>;
}
