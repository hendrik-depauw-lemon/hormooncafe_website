import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import List from '@/src/components/molecules/List';
import { ActivityLog } from '@/src/components/organism/activity-log/ActivityLog';
import { Card, CardContent } from '@/src/shadcn/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shadcn/components/ui/tabs';
import { formatDateTime } from '@/src/utils/formatDate';

import { ScheduledJobReadModelQuery } from '../../../../../../../../src/gql/generated/graphql';
import { ScheduledJobActiveSwitch } from './ScheduledJobActiveSwitch';

type ScheduledJobDetailsProps = {
    initialValues: NonNullable<ScheduledJobReadModelQuery['ScheduledJobReadModel']>;
};

export function ScheduledJobDetails({ initialValues }: ScheduledJobDetailsProps) {
    const t = useTranslations('scheduled-job.details.0.details');

    const items = useMemo(
        () => [
            { key: t('created-at'), value: formatDateTime(initialValues.createdAt) },
            { key: t('updated-at'), value: formatDateTime(initialValues.updatedAt) },
            { key: t('active'), value: <ScheduledJobActiveSwitch initialValues={initialValues} /> },
        ],
        [initialValues, t],
    );

    return (
        <Tabs defaultValue="details">
            <TabsList className="w-full">
                <TabsTrigger value="details">{t('details')}</TabsTrigger>
                <TabsTrigger value="activity-log">{t('activity-log')}</TabsTrigger>
            </TabsList>
            <Card>
                <CardContent>
                    <TabsContent value="details">
                        <List items={items} />
                    </TabsContent>
                    <TabsContent value="activity-log">
                        <ActivityLog entityTypeName="ScheduledJob" entityId={initialValues.id} />
                    </TabsContent>
                </CardContent>
            </Card>
        </Tabs>
    );
}
