import { CircleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { LoadingSpinner } from '@/src/components/atoms/LoadingSpinner';
import { Muted } from '@/src/components/atoms/typography/Muted';
import { Small } from '@/src/components/atoms/typography/Small';
import { Progress } from '@/src/shadcn/components/ui/progress';

import { JobExecutionReadModelQuery } from '../../../../../../../../src/gql/generated/graphql';
import { formatDateTimeSeconds } from '../../../../../../../../src/utils/formatDate';
import { formatDuration } from '../../../../../../../../src/utils/formatDuration';

type JobDetailsProps = {
    initialValues?: NonNullable<JobExecutionReadModelQuery['JobExecutionReadModel']> | null;
};

export function JobDetails({ initialValues }: JobDetailsProps) {
    const t = useTranslations('job.details.0.details');

    if (!initialValues) return <LoadingSpinner />;
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-1 items-center w-full">
                    <Muted>{`${t('items-processed')}:`}</Muted>
                    <Small>
                        {(initialValues.successfulItems ?? 0) + (initialValues.failedItems ?? 0)}
                    </Small>
                    <Muted>{`/ ${initialValues.totalItems}`}</Muted>
                    {!!initialValues.failedItems && (
                        <span className="inline-flex items-center gap-1 ml-2">
                            <CircleAlert className="text-destructive size-4" />
                            <Small className="text-destructive">
                                {t('items-failed', { amount: initialValues.failedItems })}
                            </Small>
                        </span>
                    )}
                    <Muted className="ml-auto">{`${initialValues.progress.toFixed(0)}%`}</Muted>
                </div>
                <Progress value={initialValues.progress} />
            </div>
            <div className="flex flex-col gap-1">
                {!!initialValues.startedAt && (
                    <div className="flex flex-row gap-1 items-center w-full">
                        <Muted>{`${t('started-at')}:`}</Muted>
                        <Small>{formatDateTimeSeconds(initialValues.startedAt)}</Small>
                    </div>
                )}
                {!!initialValues.durationInSeconds && (
                    <div className="flex flex-row gap-1 items-center w-full">
                        <Muted>{`${t('duration')}:`}</Muted>
                        <Small>{formatDuration(initialValues.durationInSeconds)}</Small>
                    </div>
                )}
                {!initialValues.completedAt && !!initialValues.estimatedSecondsRemaining && (
                    <div className="flex flex-row gap-1 items-center w-full">
                        <Muted>{`${t('remaining')}:`}</Muted>
                        <Small>{formatDuration(initialValues.estimatedSecondsRemaining)}</Small>
                    </div>
                )}
                {!!initialValues.completedAt && (
                    <div className="flex flex-row gap-1 items-center w-full">
                        <Muted>{`${t('completed-at')}:`}</Muted>
                        <Small>{formatDateTimeSeconds(initialValues.completedAt)}</Small>
                    </div>
                )}
            </div>
            {initialValues.summary && (
                <div className="flex flex-col gap-1">
                    <Muted>{`${t('summary')}:`}</Muted>
                    <Small className="whitespace-pre-wrap">{initialValues.summary}</Small>
                </div>
            )}
        </div>
    );
}
