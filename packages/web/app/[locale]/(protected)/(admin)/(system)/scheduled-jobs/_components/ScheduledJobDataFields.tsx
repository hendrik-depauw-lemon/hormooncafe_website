import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';
import z from 'zod';

import { JsonInput } from '../../../../../../../src/components/atoms/JsonInput';
import { FormRenderProps } from '../../../../../../../src/components/organism/form/Form';
import { Field, FieldError, FieldLabel } from '../../../../../../../src/shadcn/components/ui/field';

const schema = z.object({
    data: z.string().refine(
        (val) => {
            if (!val) return true;
            try {
                JSON.parse(val);
                return true;
            } catch {
                return false;
            }
        },
        {
            message: 'Invalid JSON',
        },
    ),
});
export { schema as scheduledJobDataFieldsSchema };

export function ScheduledJobDataFields(form: FormRenderProps<typeof schema>) {
    const t = useTranslations('scheduled-job.common.fields');

    return (
        <>
            <Controller
                control={form.control}
                name="data"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="md:col-span-2">
                        <FieldLabel htmlFor={field.name} optional={schema.shape.data.isOptional()}>
                            {t('data.label')}
                        </FieldLabel>
                        <JsonInput {...field} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
        </>
    );
}
