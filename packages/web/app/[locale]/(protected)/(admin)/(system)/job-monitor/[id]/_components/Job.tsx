'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { JobDetails } from '@/app/[locale]/(protected)/(admin)/(system)/job-monitor/[id]/_components/JobDetails';
import { JobMessages } from '@/app/[locale]/(protected)/(admin)/(system)/job-monitor/[id]/_components/JobMessages';
import { JobMetadata } from '@/app/[locale]/(protected)/(admin)/(system)/job-monitor/[id]/_components/JobMetadata';
import { getJobExecutionQuery } from '@/app/[locale]/(protected)/(admin)/(system)/job-monitor/[id]/_queries/getJobExecution';
import { ContentTemplate } from '@/src/components/templates/ContentTemplate';
import { SubContentTemplate } from '@/src/components/templates/SubContentTemplate';
import { Card, CardContent } from '@/src/shadcn/components/ui/card';
import { getClient } from '@/src/utils/urql/getURQLClient';

import { CancelJobButton } from './CancelJobButton';
import { JobData } from './JobData';

type JobDetailProps = {
    jobId: string;
};

export function Job({ jobId }: JobDetailProps) {
    const t = useTranslations('job.details.0');

    const { data } = useQuery({
        queryKey: ['job', jobId],
        queryFn: async () => {
            return getClient()
                .query(getJobExecutionQuery, { id: jobId })
                .then((res) => res.data);
        },
        refetchInterval: 1000,
    });

    if (!data?.JobExecutionReadModel) return null;

    return (
        <>
            <ContentTemplate
                title={t('title', { name: data?.JobExecutionReadModel?.name ?? t('loading') })}
                description={t('lead')}
                actions={<CancelJobButton initialValues={data?.JobExecutionReadModel} />}
                aside={<JobMetadata initialValues={data?.JobExecutionReadModel} />}
            >
                <Card>
                    <CardContent>
                        <JobDetails initialValues={data?.JobExecutionReadModel} />
                    </CardContent>
                </Card>
            </ContentTemplate>
            <SubContentTemplate>
                <JobData initialValues={data?.JobExecutionReadModel} />
            </SubContentTemplate>
            <SubContentTemplate>
                <JobMessages initialValues={data?.JobExecutionReadModel} />
            </SubContentTemplate>
        </>
    );
}
