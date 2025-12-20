import { useTranslations } from 'next-intl';
import { Fragment } from 'react';
import { Controller } from 'react-hook-form';
import z from 'zod';

import { Field, FieldError, FieldLabel } from '../../../../../shadcn/components/ui/field';
import { Input } from '../../../../../shadcn/components/ui/input';
import { Textarea } from '../../../../../shadcn/components/ui/textarea';
import { ColorPickerWithOptions } from '../../../../atoms/ColorPickerWithOptions';
import { DateTimePicker } from '../../../../atoms/DateTimePicker';
import { Muted } from '../../../../atoms/typography/Muted';
import { CalendarGroupComboBoxWithQuery } from '../../../combo-box/calendar-group/CalendarGroupComboBoxWithQuery';
import { FormRenderProps } from '../../../form/Form';
import { RowField } from '../../../form/RowField';

export const updateCalendarEventFieldsSchema = z.object({
    calendarGroupId: z.string().optional().nullish(),
    displayName: z.string(),
    description: z.string().optional(),
    startDateTime: z.coerce.date(),
    endDateTime: z.coerce.date(),
    color: z.string().optional(),
});

interface UpdateCalendarEventFieldsProps
    extends FormRenderProps<typeof updateCalendarEventFieldsSchema> {
    timezone: string;
}

export function UpdateCalendarEventFields({ timezone, ...form }: UpdateCalendarEventFieldsProps) {
    const t = useTranslations('calendar.common.fields');

    return (
        <Fragment>
            <Controller
                control={form.control}
                name="calendarGroupId"
                render={({ field, fieldState }) => (
                    <Field className="md:col-span-2">
                        <FieldLabel htmlFor={field.name}>{t('calendar-group.label')}</FieldLabel>
                        <CalendarGroupComboBoxWithQuery {...field} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
            <Controller
                control={form.control}
                name="displayName"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="md:col-span-2">
                        <FieldLabel htmlFor={field.name}>{t('display-name.label')}</FieldLabel>
                        <Input {...field} aria-invalid={fieldState.invalid} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
            <Controller
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="md:col-span-2">
                        <FieldLabel htmlFor={field.name}>{t('description.label')}</FieldLabel>
                        <Textarea {...field} aria-invalid={fieldState.invalid} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
            <Controller
                control={form.control}
                name="startDateTime"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="md:col-span-2">
                        <FieldLabel htmlFor={field.name}>
                            {t('start-date-time.label')} <Muted>({timezone})</Muted>
                        </FieldLabel>
                        <DateTimePicker {...field} timezone={timezone} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
            <Controller
                control={form.control}
                name="endDateTime"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="md:col-span-2">
                        <FieldLabel htmlFor={field.name}>
                            {t('end-date-time.label')} <Muted>({timezone})</Muted>
                        </FieldLabel>
                        <DateTimePicker {...field} timezone={timezone} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
            <Controller
                control={form.control}
                name="color"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="md:col-span-2">
                        <RowField>
                            <FieldLabel htmlFor={field.name}>{t('color.label')}</FieldLabel>
                            <ColorPickerWithOptions {...field} />
                        </RowField>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
        </Fragment>
    );
}
