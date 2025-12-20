import { FileWarning, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '../../../shadcn/components/ui/button';
import { Small } from '../typography/Small';

type FilePreviewErrorProps = {
    onDelete?: () => void;
};

export function FilePreviewError({ onDelete }: FilePreviewErrorProps) {
    const t = useTranslations('common.file-input');

    return (
        <div className="rounded-md border flex flex-row items-center overflow-hidden">
            <div className="w-24 h-24 bg-destructive">
                <FileWarning className="text-destructive-foreground m-auto h-full" />
            </div>
            <div className="flex flex-row p-3 gap-3 justify-between w-full items-center">
                <Small>{t('not-found')}</Small>
                {!!onDelete && (
                    <Button variant="ghost" size="icon" onClick={onDelete}>
                        <Trash2 />
                    </Button>
                )}
            </div>
        </div>
    );
}
