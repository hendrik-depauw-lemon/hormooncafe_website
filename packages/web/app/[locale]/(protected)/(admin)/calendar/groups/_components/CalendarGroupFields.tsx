import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';
import z from 'zod';

import { ColorPickerWithOptions } from '../../../../../../../src/components/atoms/ColorPickerWithOptions';
import { FormRenderProps } from '../../../../../../../src/components/organism/form/Form';
import { Field, FieldError, FieldLabel } from '../../../../../../../src/shadcn/components/ui/field';
import { Input } from '../../../../../../../src/shadcn/components/ui/input';

export const schema = z.object({
    name: z.string(),
    color: z.string().optional(),
});
export { schema as calendarGroupFieldsSchema };

export function CalendarGroupFields(form: FormRenderProps<typeof schema>) {
    const t = useTranslations('calendar-groups.common.fields');

    return (
        <>
            <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="md:col-span-2">
                        <FieldLabel htmlFor={field.name}>{t('name.label')}</FieldLabel>
                        <Input {...field} aria-invalid={fieldState.invalid} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
            <Controller
                control={form.control}
                name="color"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="md:col-span-2">
                        <FieldLabel htmlFor={field.name}>{t('color.label')}</FieldLabel>
                        <ColorPickerWithOptions {...field} aria-invalid={fieldState.invalid} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
        </>
    );
}
