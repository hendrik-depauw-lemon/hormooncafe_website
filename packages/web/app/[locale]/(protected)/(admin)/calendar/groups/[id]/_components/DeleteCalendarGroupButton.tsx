'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { useMutation } from 'urql';
import z from 'zod';

import { ControlledCheckBox } from '../../../../../../../../src/components/atoms/ControlledCheckBox';
import { Form } from '../../../../../../../../src/components/organism/form/Form';
import { RowField } from '../../../../../../../../src/components/organism/form/RowField';
import { useRouter } from '../../../../../../../../src/i18n/navigation';
import { Button } from '../../../../../../../../src/shadcn/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../../../../../../../src/shadcn/components/ui/dialog';
import {
    Field,
    FieldError,
    FieldLabel,
} from '../../../../../../../../src/shadcn/components/ui/field';
import { deleteCalendarGroupMutation } from '../_actions/deleteCalendarGroup';

const schema = z.object({
    keepAndUnlinkEvents: z.boolean(),
});

interface DeleteCalendarGroupButtonProps {
    calendarGroupId: string;
    calendarGroupName: string;
}

export function DeleteCalendarGroupButton({
    calendarGroupId,
    calendarGroupName,
}: DeleteCalendarGroupButtonProps) {
    const t = useTranslations('calendar-groups.details.actions.delete');
    const router = useRouter();
    const [_, deleteCalendarGroup] = useMutation(deleteCalendarGroupMutation);
    const [open, setOpen] = useState(false);

    const onSubmit = async (data: z.infer<typeof schema>) => {
        await deleteCalendarGroup({
            input: {
                calendarGroupId: calendarGroupId,
                keepAndUnlinkEvents: data.keepAndUnlinkEvents,
            },
        });
        router.replace('/calendar/groups');
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive">{t('label')}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('title')}</DialogTitle>
                    <DialogDescription>
                        {t('description', { name: calendarGroupName })}
                    </DialogDescription>
                </DialogHeader>

                <Form
                    schema={schema}
                    onSubmit={onSubmit}
                    defaultValues={{ keepAndUnlinkEvents: false }}
                    render={(form) => (
                        <Controller
                            control={form.control}
                            name="keepAndUnlinkEvents"
                            render={({ field, fieldState }) => (
                                <Field className="md:col-span-2">
                                    <RowField>
                                        <FieldLabel htmlFor={field.name}>
                                            {t('keep-and-unlink-events')}
                                        </FieldLabel>
                                        <ControlledCheckBox {...field} />
                                    </RowField>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    )}
                    renderActions={(form) => (
                        <>
                            <Button variant="outline" onClick={() => setOpen(false)}>
                                {t('cancel-button-label')}
                            </Button>
                            <Button variant="destructive" onClick={form.handleSubmit(onSubmit)}>
                                {t('delete-button-label')}
                            </Button>
                        </>
                    )}
                />
            </DialogContent>
        </Dialog>
    );
}
