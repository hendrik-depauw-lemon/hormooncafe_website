import { PropsWithChildren } from 'react';

import { cn } from '../../../shadcn/lib/utils';

type InlineCodeProps = PropsWithChildren & { className?: string };

export function InlineCode({ children, className }: InlineCodeProps) {
    return (
        <code
            className={cn(
                `bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-normal`,
                className,
            )}
        >
            {children}
        </code>
    );
}
