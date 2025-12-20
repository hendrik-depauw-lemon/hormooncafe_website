import { NextPage } from 'next';
import { getTranslations } from 'next-intl/server';

import { Card, CardContent } from '@/src/shadcn/components/ui/card';

import { ContentTemplate } from '../../../../../../src/components/templates/ContentTemplate';
import { CreatePublisherForm } from './_components/CreatePublisherForm';

const Page: NextPage = async () => {
    const t = await getTranslations('publisher.create');

    return (
        <ContentTemplate title={t('0.title')}>
            <Card>
                <CardContent>
                    <CreatePublisherForm />
                </CardContent>
            </Card>
        </ContentTemplate>
    );
};

export default Page;
