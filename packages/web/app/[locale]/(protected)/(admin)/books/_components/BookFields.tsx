import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';
import z from 'zod';

import { BooleanSelect } from '../../../../../../src/components/atoms/BooleanSelect';
import { CustomSelect } from '../../../../../../src/components/atoms/CustomSelect';
import { FormRenderProps } from '../../../../../../src/components/organism/form/Form';
import { BookCoverType } from '../../../../../../src/gql/generated/graphql';
import { DatePicker } from '../../../../../../src/shadcn/components/ui/date-picker';
import { Field, FieldError, FieldLabel } from '../../../../../../src/shadcn/components/ui/field';
import { Input } from '../../../../../../src/shadcn/components/ui/input';
import { Textarea } from '../../../../../../src/shadcn/components/ui/textarea';
import { AuthorComboBox } from './AuthorComboBox';
import { PublisherComboBox } from './PublisherComboBox';

const schema = z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.date(),
    numberOfPages: z.coerce.number(),
    availableAsEbook: z.boolean(),
    coverType: z.nativeEnum(BookCoverType),
    authorIds: z.array(z.string()),
    publisherId: z.string(),
});
export { schema as bookFieldsSchema };

export function BookFields(form: FormRenderProps<typeof schema>) {
    const t = useTranslations('book.common.fields');

    const coverTypeOptions = Object.entries(BookCoverType).map(([key, value]) => ({
        value: value,
        label: t(`cover-type.options.${key.toLowerCase()}`),
    }));

    return (
        <>
            <Controller
                control={form.control}
                name="title"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name} optional={schema.shape.title.isOptional()}>
                            {t('title.label')}
                        </FieldLabel>
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
                        <FieldLabel
                            htmlFor={field.name}
                            optional={schema.shape.description.isOptional()}
                        >
                            {t('description.label')}
                        </FieldLabel>
                        <Textarea {...field} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <Controller
                control={form.control}
                name="publishDate"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                            htmlFor={field.name}
                            optional={schema.shape.publishDate.isOptional()}
                        >
                            {t('publish-date.label')}
                        </FieldLabel>
                        <DatePicker
                            date={field.value}
                            onDateChange={field.onChange}
                            placeholder={t('publish-date.placeholder')}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <Controller
                control={form.control}
                name="numberOfPages"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                            htmlFor={field.name}
                            optional={schema.shape.numberOfPages.isOptional()}
                        >
                            {t('number-of-pages.label')}
                        </FieldLabel>
                        <Input {...field} aria-invalid={fieldState.invalid} type="number" />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <Controller
                control={form.control}
                name="availableAsEbook"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                            htmlFor={field.name}
                            optional={schema.shape.availableAsEbook.isOptional()}
                        >
                            {t('available-as-ebook.label')}
                        </FieldLabel>
                        <BooleanSelect
                            value={field.value}
                            onValueChange={field.onChange}
                            className="w-full"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <Controller
                control={form.control}
                name="coverType"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                            htmlFor={field.name}
                            optional={schema.shape.coverType.isOptional()}
                        >
                            {t('cover-type.label')}
                        </FieldLabel>
                        <CustomSelect
                            options={coverTypeOptions}
                            placeholder={t('cover-type.placeholder')}
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
                name="authorIds"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                            htmlFor={field.name}
                            optional={schema.shape.authorIds.isOptional()}
                        >
                            {t('author.label')}
                        </FieldLabel>
                        <AuthorComboBox {...field} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <Controller
                control={form.control}
                name="publisherId"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                            htmlFor={field.name}
                            optional={schema.shape.publisherId.isOptional()}
                        >
                            {t('publisher.label')}
                        </FieldLabel>
                        <PublisherComboBox {...field} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
        </>
    );
}
