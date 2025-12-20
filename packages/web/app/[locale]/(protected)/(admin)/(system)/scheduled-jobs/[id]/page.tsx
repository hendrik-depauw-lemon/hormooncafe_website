import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { ContentTemplate } from '../../../../../../../src/components/templates/ContentTemplate';
import { Card, CardContent } from '../../../../../../../src/shadcn/components/ui/card';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '../../../../../../../src/shadcn/components/ui/tabs';
import { getClient } from '../../../../../../../src/utils/urql/getURQLClient';
import { RemoveScheduledJobButton } from './_components/RemoveScheduledJobButton';
import { ScheduledJobDetails } from './_components/ScheduledJobDetails';
import { UpdateScheduledJobDataForm } from './_components/UpdateScheduledJobDataForm';
import { UpdateScheduledJobScheduleForm } from './_components/UpdateScheduledJobScheduleForm';
import { getScheduledJobQuery } from './_queries/getScheduledJob';

export const dynamic = 'force-dynamic';
export const fetchCache = 'default-no-store';

interface PageProps {
    params: Promise<{ id: string }>;
}

const Page: NextPage<PageProps> = async (props) => {
    const t = await getTranslations('scheduled-job.details');
    const params = await props.params;
    const result = await getClient().query(getScheduledJobQuery, { id: params.id });
    const entity = result.data?.ScheduledJobReadModel;
    if (!entity) notFound();

    return (
        <ContentTemplate
            title={t('0.title', { name: entity.name })}
            aside={<ScheduledJobDetails initialValues={entity} />}
            actions={<RemoveScheduledJobButton initialValues={entity} />}
        >
            <Tabs defaultValue="schedule">
                <TabsList>
                    <TabsTrigger value="schedule">{t('0.tabs.schedule')}</TabsTrigger>
                    <TabsTrigger value="data">{t('0.tabs.data')}</TabsTrigger>
                </TabsList>
                <Card>
                    <CardContent>
                        <TabsContent value="schedule">
                            <UpdateScheduledJobScheduleForm initialValues={entity} />
                        </TabsContent>
                        <TabsContent value="data">
                            <UpdateScheduledJobDataForm initialValues={entity} />
                        </TabsContent>
                    </CardContent>
                </Card>
            </Tabs>
        </ContentTemplate>
    );
};

export default Page;
