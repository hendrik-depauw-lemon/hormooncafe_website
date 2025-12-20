import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { usePathname } from '../../../../i18n/navigation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../../../shadcn/components/ui/dialog';
import { CreateViewForm } from './CreateViewForm';

type CreateViewButtonProps = {
    onClose?: () => void;
};

export function CreateViewButton({ onClose }: CreateViewButtonProps) {
    const t = useTranslations('common.views.create');
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!open) onClose?.();
    }, [open, onClose]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>{t('button.label')}</DialogTrigger>
            <DialogContent onKeyDown={(e) => e.stopPropagation()}>
                <DialogHeader>
                    <DialogTitle>{t('dialog.title')}</DialogTitle>
                    <DialogDescription>{t('dialog.description')}</DialogDescription>
                    <CreateViewForm
                        pathname={pathname}
                        searchParams={searchParams.toString()}
                        onClose={() => setOpen(false)}
                    />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
