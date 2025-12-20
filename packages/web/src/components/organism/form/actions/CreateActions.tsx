import { useTranslations } from 'next-intl';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import { SubmitButton } from '../buttons/SubmitButton';
type CreateActionsProps<T extends FieldValues> = UseFormReturn<T>;

export function CreateActions<T extends FieldValues>({ ...formProps }: CreateActionsProps<T>) {
    const t = useTranslations('common.create-form');
    return <SubmitButton {...formProps}>{t('submit-label')}</SubmitButton>;
}
