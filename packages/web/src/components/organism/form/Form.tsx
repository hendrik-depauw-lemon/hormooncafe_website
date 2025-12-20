import { zodResolver } from '@hookform/resolvers/zod';
import { isEqual } from 'lodash-es';
import { useQueryState } from 'nuqs';
import React, { useEffect, useState } from 'react';
import { DefaultValues, useForm, UseFormReturn } from 'react-hook-form';
import z, { AnyZodObject } from 'zod';

import { Field, FieldGroup } from '../../../shadcn/components/ui/field';
import { cn } from '../../../shadcn/lib/utils';
import { parseBase64 } from '../../../utils/nuqs/parseBase64';

export type FormRenderProps<S extends AnyZodObject> = UseFormReturn<
    z.infer<S>,
    unknown,
    z.infer<S>
>;

export type FormProps<S extends AnyZodObject> = {
    disabled?: boolean;
    defaultValues: DefaultValues<z.infer<S>>;
    schema: S;
    onSubmit: (data: z.infer<S>) => Promise<void>;
    render: (form: FormRenderProps<S>) => React.ReactNode;
    renderActions: (form: FormRenderProps<S>) => React.JSX.Element;
    className?: string;
};

export function Form<S extends AnyZodObject>({
    disabled,
    defaultValues,
    schema,
    onSubmit,
    render,
    renderActions,
    className,
}: FormProps<S>) {
    const [defaultValuesFromSearchParams] = useQueryState(
        'defaultValues',
        parseBase64(schema.partial()),
    );
    const [memoizedDefaultValues, setMemoizedDefaultValues] = useState<z.infer<S>>(defaultValues);

    const form = useForm<z.infer<S>>({
        disabled,
        defaultValues,
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        const newValue = { ...defaultValues, ...defaultValuesFromSearchParams };
        if (isEqual(newValue, memoizedDefaultValues)) return;
        setMemoizedDefaultValues(newValue);
    }, [defaultValues, defaultValuesFromSearchParams]);

    useEffect(() => {
        form.reset(memoizedDefaultValues);
    }, [memoizedDefaultValues]);

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup
                className={cn(
                    'grid grid-cols-1 md:grid-cols-2 gap-4 items-start',
                    className ? className : '',
                )}
            >
                {render(form)}
                <Field orientation="responsive" className="md:col-span-2 justify-end">
                    {renderActions(form)}
                </Field>
            </FieldGroup>
        </form>
    );
}
