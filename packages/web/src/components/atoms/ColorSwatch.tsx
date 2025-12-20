import { cn } from '../../shadcn/lib/utils';

interface ColorSwatchProps {
    color: string;
    size?: number;
    className?: string;
}

export function ColorSwatch({ color, size = 6, className }: ColorSwatchProps) {
    return (
        <div
            className={cn(`rounded-lg size-${size}`, className)}
            style={{ backgroundColor: color }}
        />
    );
}
