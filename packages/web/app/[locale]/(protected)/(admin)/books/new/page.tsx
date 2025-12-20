import { NextPage } from 'next';
import { getTranslations } from 'next-intl/server';

import { Card, CardContent } from '@/src/shadcn/components/ui/card';

import { ContentTemplate } from '../../../../../../src/components/templates/ContentTemplate';
import { CreateBookForm } from './_components/CreateBookForm';

const Page: NextPage = async () => {
    const t = await getTranslations('book.create');

    return (
        <ContentTemplate title={t('0.title')}>
            <Card>
                <CardContent>
                    <CreateBookForm />
                </CardContent>
            </Card>
        </ContentTemplate>
    );
};

export default Page;
