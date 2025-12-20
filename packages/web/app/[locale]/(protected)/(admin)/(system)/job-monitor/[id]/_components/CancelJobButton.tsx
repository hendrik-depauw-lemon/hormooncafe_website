'use client';

import { Ban } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMutation } from 'urql';

import { ButtonWithConfirmation } from '../../../../../../../../src/components/organism/ButtonWithConfirmation';
import {
    JobExecutionReadModel,
    JobExecutionStatus,
} from '../../../../../../../../src/gql/generated/graphql';
import { useRouter } from '../../../../../../../../src/i18n/navigation';
import { cancelJobMutation } from '../_actions/cancelJob';

type CancelJobButtonProps = {
    initialValues: NonNullable<JobExecutionReadModel>;
};

export function CancelJobButton({ initialValues }: CancelJobButtonProps) {
    const router = useRouter();
    const t = useTranslations('job.details.0.cancel-button');

    const [_, mutateAsync] = useMutation(cancelJobMutation);

    const onConfirm = async () => {
        await mutateAsync({ input: { id: initialValues.id } });
        router.replace('/job-monitor');
    };

    const isCancellable =
        initialValues.status === JobExecutionStatus.Pending ||
        initialValues.status === JobExecutionStatus.InProgress;

    return (
        <ButtonWithConfirmation
            disabled={!isCancellable}
            onConfirm={onConfirm}
            variant="destructive"
            dialogTitle={t('confirmation-dialog-title')}
            dialogDescription={t('confirmation-dialog-message')}
        >
            <Ban />
            {t('label')}
        </ButtonWithConfirmation>
    );
}
