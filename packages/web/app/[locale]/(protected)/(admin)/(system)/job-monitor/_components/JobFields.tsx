import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';
import z from 'zod';

import { CustomSelect } from '../../../../../../../src/components/atoms/CustomSelect';
import { JsonInput } from '../../../../../../../src/components/atoms/JsonInput';
import { FormRenderProps } from '../../../../../../../src/components/organism/form/Form';
import { JobKey } from '../../../../../../../src/gql/generated/graphql';
import { Field, FieldError, FieldLabel } from '../../../../../../../src/shadcn/components/ui/field';
import { Input } from '../../../../../../../src/shadcn/components/ui/input';

const schema = z.object({
    name: z.string().min(1),
    jobKey: z.nativeEnum(JobKey),
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
export { schema as jobFieldsSchema };

export function JobFields(form: FormRenderProps<typeof schema>) {
    const t = useTranslations('job.common.fields');

    const jobKeyOptions = Object.keys(JobKey).map((value) => ({
        value: value,
        label: value,
    }));

    return (
        <>
            <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name} optional={schema.shape.name.isOptional()}>
                            {t('name.label')}
                        </FieldLabel>
                        <Input {...field} aria-invalid={fieldState.invalid} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <Controller
                control={form.control}
                name="jobKey"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                            htmlFor={field.name}
                            optional={schema.shape.jobKey.isOptional()}
                        >
                            {t('job-key.label')}
                        </FieldLabel>
                        <CustomSelect
                            options={jobKeyOptions}
                            placeholder={t('job-key.placeholder')}
                            value={field.value}
                            onValueChange={field.onChange}
                            className="w-full"
                            ariaInvalid={fieldState.invalid}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

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
