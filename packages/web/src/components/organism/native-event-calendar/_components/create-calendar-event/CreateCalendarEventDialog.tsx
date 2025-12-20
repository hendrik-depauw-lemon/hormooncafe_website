import { useTranslations } from 'next-intl';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '../../../../../shadcn/components/ui/dialog';
import { CreateCalendarEventForm } from './CreateCalendarEventForm';

interface CreateCalendarEventDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    defaultStartDateTime: Date | undefined;
    timezone: string;
    onFinish?: () => void;
}

export function CreateCalendarEventDialog({
    open,
    onOpenChange,
    defaultStartDateTime,
    timezone,
    onFinish,
}: CreateCalendarEventDialogProps) {
    const t = useTranslations('calendar.create');
    return (
        <Dialog open={open && defaultStartDateTime !== undefined} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90%] min-h-[400px] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{t('title')}</DialogTitle>
                </DialogHeader>

                <CreateCalendarEventForm
                    defaultStartDateTime={defaultStartDateTime}
                    timezone={timezone}
                    onFinish={onFinish}
                />
            </DialogContent>
        </Dialog>
    );
}
