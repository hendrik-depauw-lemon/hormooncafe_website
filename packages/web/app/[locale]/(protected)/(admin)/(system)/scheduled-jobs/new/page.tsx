import { NextPage } from 'next';
import { getTranslations } from 'next-intl/server';

import { Card, CardContent } from '@/src/shadcn/components/ui/card';

import { ContentTemplate } from '../../../../../../../src/components/templates/ContentTemplate';
import { CreateScheduledJobForm } from './_components/CreateScheduledJobForm';

const Page: NextPage = async () => {
    const t = await getTranslations('scheduled-job.create');

    return (
        <ContentTemplate title={t('0.title')}>
            <Card>
                <CardContent>
                    <CreateScheduledJobForm />
                </CardContent>
            </Card>
        </ContentTemplate>
    );
};

export default Page;
