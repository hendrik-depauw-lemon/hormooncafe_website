import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import List from '@/src/components/molecules/List';
import { ActivityLog } from '@/src/components/organism/activity-log/ActivityLog';
import { Card, CardContent } from '@/src/shadcn/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shadcn/components/ui/tabs';
import { formatDateTime } from '@/src/utils/formatDate';

import { PublisherReadModelQuery } from '../../../../../../../src/gql/generated/graphql';

type PublisherDetailsProps = {
    initialValues: NonNullable<PublisherReadModelQuery['PublisherReadModel']>;
};

export function PublisherDetails({ initialValues }: PublisherDetailsProps) {
    const t = useTranslations('publisher.details.0.details');

    const items = useMemo(
        () => [
            { key: t('created-at'), value: formatDateTime(initialValues.createdAt) },
            { key: t('updated-at'), value: formatDateTime(initialValues.updatedAt) },
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
                        <ActivityLog entityTypeName="Publisher" entityId={initialValues.id} />
                    </TabsContent>
                </CardContent>
            </Card>
        </Tabs>
    );
}
