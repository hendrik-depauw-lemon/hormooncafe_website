import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { ContentTemplate } from '../../../../../../../src/components/templates/ContentTemplate';
import { Card, CardContent } from '../../../../../../../src/shadcn/components/ui/card';
import { getClient } from '../../../../../../../src/utils/urql/getURQLClient';
import { CalendarGroupDetails } from './_components/CalendarGroupDetails';
import { DeleteCalendarGroupButton } from './_components/DeleteCalendarGroupButton';
import { UpdateCalendarGroupForm } from './_components/UpdateCalendarGroupForm';
import { getCalendarGroupQuery } from './_queries/getCalendarGroup';

export const dynamic = 'force-dynamic';
export const fetchCache = 'default-no-store';

interface PageProps {
    params: Promise<{ id: string }>;
}

const Page: NextPage<PageProps> = async (props) => {
    const t = await getTranslations('calendar-groups.details');
    const params = await props.params;
    const result = await getClient().query(getCalendarGroupQuery, { id: params.id });
    const entity = result.data?.CalendarGroupReadModel;
    if (!entity) notFound();

    return (
        <>
            <ContentTemplate
                title={t('title', { name: entity.name })}
                aside={<CalendarGroupDetails initialValues={entity} />}
                actions={
                    <DeleteCalendarGroupButton
                        calendarGroupId={entity.id}
                        calendarGroupName={entity.name}
                    />
                }
            >
                <Card>
                    <CardContent>
                        <UpdateCalendarGroupForm initialValues={entity} />
                    </CardContent>
                </Card>
            </ContentTemplate>
        </>
    );
};

export default Page;
