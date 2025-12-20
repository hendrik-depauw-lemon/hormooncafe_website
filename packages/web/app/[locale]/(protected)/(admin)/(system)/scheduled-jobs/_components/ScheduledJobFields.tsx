import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';
import z from 'zod';

import { CustomSelect } from '../../../../../../../src/components/atoms/CustomSelect';
import { FormRenderProps } from '../../../../../../../src/components/organism/form/Form';
import { JobKey } from '../../../../../../../src/gql/generated/graphql';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from '../../../../../../../src/shadcn/components/ui/field';
import { Input } from '../../../../../../../src/shadcn/components/ui/input';
import { ScheduleDescription } from './ScheduleDescription';

const schema = z.object({
    name: z.string().min(1),
    schedule: z.string().min(1),
    jobKey: z.nativeEnum(JobKey),
});
export { schema as scheduledJobFieldsSchema };

export function ScheduledJobFields(form: FormRenderProps<typeof schema>) {
    const t = useTranslations('scheduled-job.common.fields');

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
                            onValueChange={(val) => field.onChange(val)}
                            className="w-full"
                            ariaInvalid={fieldState.invalid}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <Controller
                control={form.control}
                name="schedule"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="md:col-span-2">
                        <FieldLabel
                            htmlFor={field.name}
                            optional={schema.shape.schedule.isOptional()}
                        >
                            {t('schedule.label')}
                        </FieldLabel>
                        <Input {...field} aria-invalid={fieldState.invalid} />
                        <FieldDescription>
                            {field.value && <ScheduleDescription schedule={field.value} />}
                        </FieldDescription>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
        </>
    );
}
