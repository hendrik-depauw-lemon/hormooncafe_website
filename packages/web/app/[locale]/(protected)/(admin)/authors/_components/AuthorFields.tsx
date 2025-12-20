import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';
import z from 'zod';

import { FormRenderProps } from '../../../../../../src/components/organism/form/Form';
import { Field, FieldError, FieldLabel } from '../../../../../../src/shadcn/components/ui/field';
import { Input } from '../../../../../../src/shadcn/components/ui/input';

const schema = z.object({
    name: z.string(),
});
export { schema as authorFieldsSchema };

export function AuthorFields(form: FormRenderProps<typeof schema>) {
    const t = useTranslations('author.common.fields');

    return (
        <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="md:col-span-2">
                    <FieldLabel htmlFor={field.name} optional={schema.shape.name.isOptional()}>
                        {t('name.label')}
                    </FieldLabel>
                    <Input {...field} aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    );
}
