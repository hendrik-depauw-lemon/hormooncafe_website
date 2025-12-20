import React from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import { Button } from '../../../../shadcn/components/ui/button';
import { Spinner } from '../../../../shadcn/components/ui/spinner';
type SubmitButtonProps<T extends FieldValues> = {
    children: React.ReactNode;
} & UseFormReturn<T>;

export function SubmitButton<T extends FieldValues>({
    children,
    ...formProps
}: SubmitButtonProps<T>) {
    const { isSubmitting, isLoading, isDirty, disabled } = formProps.formState;

    return (
        <Button type="submit" disabled={isSubmitting || disabled || !isDirty}>
            {(isLoading || isSubmitting) && <Spinner />}
            {children}
        </Button>
    );
}
