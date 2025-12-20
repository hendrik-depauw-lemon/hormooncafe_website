import { useMutation } from '@urql/next';
import { useTranslations } from 'next-intl';
import { Controller } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/src/shadcn/components/ui/button';
import { Input } from '@/src/shadcn/components/ui/input';

import { Field, FieldError, FieldLabel } from '../../../../shadcn/components/ui/field';
import { SubmitButton } from '../../form/buttons/SubmitButton';
import { Form } from '../../form/Form';
import { addViewMutation } from '../_actions/addView';

type CreateViewFormProps = {
    pathname: string;
    searchParams: string;
    onClose?: () => void;
};

export function CreateViewForm({ pathname, searchParams, onClose }: CreateViewFormProps) {
    const t = useTranslations('common.views.create.form');

    const [_, addView] = useMutation(addViewMutation);

    const formSchema = z.object({
        name: z.string(),
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        await addView({
            input: {
                name: data.name,
                pathname,
                searchParams,
            },
        });
        onClose?.();
    };

    return (
        <Form
            defaultValues={{
                name: '',
            }}
            schema={formSchema}
            onSubmit={onSubmit}
            renderActions={(form) => (
                <Field orientation="responsive">
                    <Button type="button" variant="outline" onClick={onClose}>
                        {t('actions.cancel')}
                    </Button>
                    <SubmitButton {...form}>{t('actions.save')}</SubmitButton>
                </Field>
            )}
            render={(form) => (
                <Controller
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="md:col-span-2">
                            <FieldLabel htmlFor={field.name}>{t('fields.name.label')}</FieldLabel>
                            <Input
                                {...field}
                                aria-invalid={fieldState.invalid}
                                placeholder={t('fields.name.placeholder')}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            )}
        ></Form>
    );
}
