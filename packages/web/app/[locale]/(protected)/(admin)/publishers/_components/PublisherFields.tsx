import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';
import z from 'zod';

import { AddressComboBox } from '../../../../../../src/components/organism/combo-box/address/AddressComboBox';
import { FormRenderProps } from '../../../../../../src/components/organism/form/Form';
import { Field, FieldError, FieldLabel } from '../../../../../../src/shadcn/components/ui/field';
import { Input } from '../../../../../../src/shadcn/components/ui/input';

const schema = z.object({
    name: z.string(),
    addressPlaceId: z.string().optional(),
});
export { schema as publisherFieldsSchema };

export function PublisherFields(form: FormRenderProps<typeof schema>) {
    const t = useTranslations('publisher.common.fields');

    return (
        <>
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
            <Controller
                control={form.control}
                name="addressPlaceId"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="md:col-span-2">
                        <FieldLabel
                            htmlFor={field.name}
                            optional={schema.shape.addressPlaceId.isOptional()}
                        >
                            {t('address.label')}
                        </FieldLabel>
                        <AddressComboBox {...field} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
        </>
    );
}
