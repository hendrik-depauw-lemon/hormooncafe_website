import { useTranslations } from 'next-intl';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import { SubmitButton } from '../buttons/SubmitButton';
type UpdateActionsProps<T extends FieldValues> = UseFormReturn<T>;

export function UpdateActions<T extends FieldValues>({ ...formProps }: UpdateActionsProps<T>) {
    const t = useTranslations('common.update-form');
    return <SubmitButton {...formProps}>{t('submit-label')}</SubmitButton>;
}
