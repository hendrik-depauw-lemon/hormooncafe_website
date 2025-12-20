import { NextPage } from 'next';
import { getTranslations } from 'next-intl/server';

import { Card, CardContent } from '@/src/shadcn/components/ui/card';

import { ContentTemplate } from '../../../../../../../src/components/templates/ContentTemplate';
import { ExecuteJobForm } from './_components/ExecuteJobForm';

const Page: NextPage = async () => {
    const t = await getTranslations('job.execute');

    return (
        <ContentTemplate title={t('0.title')}>
            <Card>
                <CardContent>
                    <ExecuteJobForm />
                </CardContent>
            </Card>
        </ContentTemplate>
    );
};

export default Page;
