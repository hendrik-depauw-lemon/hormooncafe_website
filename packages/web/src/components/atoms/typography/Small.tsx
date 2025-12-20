import { PropsWithChildren } from 'react';

import { cn } from '../../../shadcn/lib/utils';

type SmallProps = PropsWithChildren & { className?: string };

export function Small({ children, className }: SmallProps) {
    return <small className={cn(`text-sm leading-none font-medium`, className)}>{children}</small>;
}
