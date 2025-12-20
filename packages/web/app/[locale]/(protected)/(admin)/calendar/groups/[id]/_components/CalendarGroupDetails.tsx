import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import List from '@/src/components/molecules/List';
import { ActivityLog } from '@/src/components/organism/activity-log/ActivityLog';
import { Card, CardContent } from '@/src/shadcn/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shadcn/components/ui/tabs';
import { formatDateTime } from '@/src/utils/formatDate';

import { GetCalendarGroupQuery } from '../../../../../../../../src/gql/generated/graphql';

type CalendarGroupDetailsProps = {
    initialValues: NonNullable<GetCalendarGroupQuery['CalendarGroupReadModel']>;
};

export function CalendarGroupDetails({ initialValues }: CalendarGroupDetailsProps) {
    const t = useTranslations('calendar-groups.details');
    const items = useMemo(
        () => [
            { key: t('details.created-at'), value: formatDateTime(initialValues.createdAt) },
            { key: t('details.updated-at'), value: formatDateTime(initialValues.updatedAt) },
        ],
        [initialValues, t],
    );

    return (
        <Tabs defaultValue="details">
            <TabsList className="w-full">
                <TabsTrigger value="details">{t('details.title')}</TabsTrigger>
                <TabsTrigger value="activity-log">{t('activity-log.title')}</TabsTrigger>
            </TabsList>
            <Card>
                <CardContent>
                    <TabsContent value="details">
                        <List items={items} />
                    </TabsContent>
                    <TabsContent value="activity-log">
                        <ActivityLog entityTypeName="CalendarGroup" entityId={initialValues.id} />
                    </TabsContent>
                </CardContent>
            </Card>
        </Tabs>
    );
}
