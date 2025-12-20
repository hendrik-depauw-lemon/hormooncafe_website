import { NextPage } from 'next';
import { getTranslations } from 'next-intl/server';

import { Card, CardContent } from '@/src/shadcn/components/ui/card';

import { ContentTemplate } from '../../../../../../../src/components/templates/ContentTemplate';
import { CreateCalendarGroupForm } from './_components/CreateCalendarGroupForm';

const Page: NextPage = async () => {
    const t = await getTranslations('calendar-groups.create');

    return (
        <ContentTemplate title={t('title')}>
            <Card>
                <CardContent>
                    <CreateCalendarGroupForm />
                </CardContent>
            </Card>
        </ContentTemplate>
    );
};

export default Page;
