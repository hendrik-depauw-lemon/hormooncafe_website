import { LucideTriangleAlert } from 'lucide-react';

interface ErrorOverlayProps {
    message: string;
}

export function ErrorOverlay({ message }: ErrorOverlayProps) {
    return (
        <div className="absolute flex items-center justify-center w-full h-full z-10 bg-background/70 backdrop-blur-xs flex-col gap-4">
            <LucideTriangleAlert className="size-12 text-destructive-foreground" />
            <p className="text-destructive-foreground">{message}</p>
        </div>
    );
}
