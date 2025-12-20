import { useTranslations } from 'next-intl';

import { Button } from '../../shadcn/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../shadcn/components/ui/dialog';

type ButtonWithConfirmationProps = React.ComponentProps<typeof Button> & {
    dialogTitle?: string;
    dialogDescription?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    onConfirm?: () => void;
};

export function ButtonWithConfirmation({
    dialogTitle,
    dialogDescription,
    confirmButtonText,
    cancelButtonText,
    onConfirm,
    children,
    ...buttonProps
}: ButtonWithConfirmationProps) {
    const t = useTranslations('common.confirmation-dialog');

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button {...buttonProps}>{children}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{dialogTitle || t('title')}</DialogTitle>
                    {dialogDescription && (
                        <DialogDescription>{dialogDescription}</DialogDescription>
                    )}
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">{cancelButtonText || t('cancel-button')}</Button>
                    </DialogClose>
                    <Button variant={buttonProps.variant} onClick={onConfirm}>
                        {confirmButtonText || t('confirm-button')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
