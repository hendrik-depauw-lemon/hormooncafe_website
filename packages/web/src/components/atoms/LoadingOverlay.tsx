import { Spinner } from '../../shadcn/components/ui/spinner';

export function LoadingOverlay() {
    return (
        <div className="absolute flex items-center justify-center w-full h-full z-10 bg-background/70 backdrop-blur-xs">
            <Spinner className="size-12" />
        </div>
    );
}
