import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { LoadingSpinner } from '@/src/components/atoms/LoadingSpinner';

import List from '../../../../../../../../src/components/molecules/List';
import { JobExecutionReadModelQuery } from '../../../../../../../../src/gql/generated/graphql';
import { Link } from '../../../../../../../../src/i18n/navigation';
import { Button } from '../../../../../../../../src/shadcn/components/ui/button';
import { Card, CardContent } from '../../../../../../../../src/shadcn/components/ui/card';
import { JobStatusBadge } from '../../_components/JobStatusBadge';

type JobMetadataProps = {
    initialValues: NonNullable<JobExecutionReadModelQuery['JobExecutionReadModel']>;
};

export function JobMetadata({ initialValues }: JobMetadataProps) {
    const t = useTranslations('job.details.0.tabs.metadata');

    const items = useMemo(() => {
        const items = [
            { key: t('status'), value: <JobStatusBadge status={initialValues.status} /> },
            { key: t('created-at'), value: initialValues.createdAt.toLocaleDateString() },
            { key: t('updated-at'), value: initialValues.updatedAt.toLocaleDateString() },
        ];
        if (initialValues.scheduledJobId) {
            items.push({
                key: t('scheduled-job'),
                value: (
                    <Button asChild variant="link" className="p-0 h-5">
                        <Link href={`/scheduled-jobs/${initialValues.scheduledJobId}`}>
                            {t('go-to-scheduled-job')}
                        </Link>
                    </Button>
                ),
            });
        }
        return items;
    }, [initialValues, t]);

    if (!initialValues) return <LoadingSpinner />;

    return (
        <Card>
            <CardContent>
                <List items={items} />
            </CardContent>
        </Card>
    );
}
