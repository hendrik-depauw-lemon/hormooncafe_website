'use client';

import { Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMutation } from 'urql';

import { ButtonWithConfirmation } from '../../../../../../../../src/components/organism/ButtonWithConfirmation';
import { ScheduledJobReadModel } from '../../../../../../../../src/gql/generated/graphql';
import { useRouter } from '../../../../../../../../src/i18n/navigation';
import { removeScheduledJobMutation } from '../_actions/removeScheduledJob';

type RemoveScheduledJobButtonProps = {
    initialValues: NonNullable<ScheduledJobReadModel>;
};

export function RemoveScheduledJobButton({ initialValues }: RemoveScheduledJobButtonProps) {
    const router = useRouter();
    const t = useTranslations('scheduled-job.details.0.delete-button');

    const [_, mutateAsync] = useMutation(removeScheduledJobMutation);

    const onConfirm = async () => {
        await mutateAsync({ input: { id: initialValues.id } });
        router.replace('/scheduled-jobs');
    };

    return (
        <ButtonWithConfirmation
            disabled={initialValues.active}
            onConfirm={onConfirm}
            variant="destructive"
            dialogTitle={t('confirmation-dialog-title')}
            dialogDescription={t('confirmation-dialog-message')}
        >
            <Trash />
            {t('label')}
        </ButtonWithConfirmation>
    );
}
