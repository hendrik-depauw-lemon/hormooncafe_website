import { Loader2Icon } from 'lucide-react';
import { FC } from 'react';

import { cn } from '../../shadcn/lib/utils';

export interface LoadingSpinnerProps {
    className?: string;
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ className }) => (
    <Loader2Icon className={cn('animate-spin size-4', className)} />
);

export { LoadingSpinner };
