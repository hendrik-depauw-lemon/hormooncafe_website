import { useTranslations } from 'next-intl';
import { Fragment } from 'react';
import { Controller } from 'react-hook-form';
import z from 'zod';

import {
    CalendarWeekday,
    RecurringCalendarEventFrequency,
} from '../../../../../gql/generated/graphql';
import { DatePicker } from '../../../../../shadcn/components/ui/date-picker';
import { Field, FieldError, FieldLabel } from '../../../../../shadcn/components/ui/field';
import { Input } from '../../../../../shadcn/components/ui/input';
import { Textarea } from '../../../../../shadcn/components/ui/textarea';
import { CheckboxGroup } from '../../../../atoms/CheckboxGroup';
import { ColorPickerWithOptions } from '../../../../atoms/ColorPickerWithOptions';
import { ControlledCheckBox } from '../../../../atoms/ControlledCheckBox';
import { CustomSelect } from '../../../../atoms/CustomSelect';
import { DateTimePicker } from '../../../../atoms/DateTimePicker';
import { Muted } from '../../../../atoms/typography/Muted';
import { CalendarGroupComboBoxWithQuery } from '../../../combo-box/calendar-group/CalendarGroupComboBoxWithQuery';
import { FormRenderProps } from '../../../form/Form';
import { RowField } from '../../../form/RowField';

export const updateRecurringCalendarEventFieldsSchema = z.object({
    calendarGroupId: z.string().optional().nullish(),
    displayName: z.string(),
    description: z.string().optional(),
    startDateTime: z.coerce.date(),
    endDateTime: z.coerce.date(),
    color: z.string().optional(),

    isRecurringEvent: z.coerce.boolean().default(true),

    frequency: z
        .nativeEnum(RecurringCalendarEventFrequency)
        .default(RecurringCalendarEventFrequency.Weekly),
    every: z.coerce.number().min(1).default(1),
    onWeekdays: z.array(z.nativeEnum(CalendarWeekday)).default([]),
    endDateForRecurringCalendarEvent: z.coerce.date().optional(),
});

interface UpdateRecurringCalendarEventFieldsProps
    extends FormRenderProps<typeof updateRecurringCalendarEventFieldsSchema> {
    timezone: string;
}

export function UpdateRecurringCalendarEventFields({
    timezone,
    ...form
}: UpdateRecurringCalendarEventFieldsProps) {
    const t = useTranslations('calendar.common.fields');
    const enumT = useTranslations('common.enums');
    const frequency = form.watch('frequency');

    const frequencyOptions = [
        {
            value: RecurringCalendarEventFrequency.Daily,
            label: enumT('calendar-event-frequency.daily'),
        },
        {
            value: RecurringCalendarEventFrequency.Weekly,
            label: enumT('calendar-event-frequency.weekly'),
        },
        {
            value: RecurringCalendarEventFrequency.Monthly,
            label: enumT('calendar-event-frequency.monthly'),
        },
    ];

    const weekdayOptions = [
        { value: CalendarWeekday.Monday, label: enumT('calendar-event-weekday.monday') },
        { value: CalendarWeekday.Tuesday, label: enumT('calendar-event-weekday.tuesday') },
        { value: CalendarWeekday.Wednesday, label: enumT('calendar-event-weekday.wednesday') },
        { value: CalendarWeekday.Thursday, label: enumT('calendar-event-weekday.thursday') },
        { value: CalendarWeekday.Friday, label: enumT('calendar-event-weekday.friday') },
        { value: CalendarWeekday.Saturday, label: enumT('calendar-event-weekday.saturday') },
        { value: CalendarWeekday.Sunday, label: enumT('calendar-event-weekday.sunday') },
    ];

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
                            {t('start-date-time-recurring-instance.label')}{' '}
                            <Muted>({timezone})</Muted>
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
                            {t('end-date-time-recurring-instance.label')}{' '}
                            <Muted>({timezone})</Muted>
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

            <Fragment>
                <Controller
                    control={form.control}
                    name="isRecurringEvent"
                    disabled
                    render={({ field, fieldState }) => (
                        <Field className="md:col-span-2">
                            <RowField>
                                <FieldLabel htmlFor={field.name}>
                                    {t('is-recurring-event.label')}
                                </FieldLabel>
                                <ControlledCheckBox {...field} />
                            </RowField>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Fragment>
                    <Controller
                        control={form.control}
                        name="frequency"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="md:col-span-2">
                                <FieldLabel htmlFor={field.name}>{t('frequency.label')}</FieldLabel>
                                <CustomSelect
                                    options={frequencyOptions}
                                    placeholder={t('frequency.placeholder')}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="w-full"
                                    ariaInvalid={fieldState.invalid}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    {frequency === RecurringCalendarEventFrequency.Weekly && (
                        <Controller
                            control={form.control}
                            name="onWeekdays"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="md:col-span-2">
                                    <FieldLabel htmlFor={field.name}>
                                        {t('on-weekdays.label')}
                                    </FieldLabel>
                                    <CheckboxGroup
                                        options={weekdayOptions}
                                        value={field.value}
                                        onChange={field.onChange}
                                        className="sm:grid-cols-4 gap-2"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    )}
                    <Controller
                        control={form.control}
                        name="every"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="md:col-span-2">
                                <RowField>
                                    <FieldLabel htmlFor={field.name}>{t('every.label')}</FieldLabel>
                                    <Input
                                        type="number"
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                    />
                                </RowField>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name="endDateForRecurringCalendarEvent"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="md:col-span-2">
                                <FieldLabel htmlFor={field.name}>
                                    {t('end-date-for-recurring-event.label')}{' '}
                                    <Muted>({timezone})</Muted>
                                </FieldLabel>
                                <DatePicker
                                    date={field.value}
                                    onDateChange={field.onChange}
                                    timezone={timezone}
                                    placeholder={t('end-date-for-recurring-event.placeholder')}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </Fragment>
            </Fragment>
        </Fragment>
    );
}
