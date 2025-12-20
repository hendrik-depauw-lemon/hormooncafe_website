import { NextPage } from 'next';
import { getTranslations } from 'next-intl/server';

import { Card, CardContent } from '@/src/shadcn/components/ui/card';

import { ContentTemplate } from '../../../../../../src/components/templates/ContentTemplate';
import { CreateAuthorForm } from './_components/CreateAuthorForm';

const Page: NextPage = async () => {
    const t = await getTranslations('author.create');

    return (
        <ContentTemplate title={t('0.title')}>
            <Card>
                <CardContent>
                    <CreateAuthorForm />
                </CardContent>
            </Card>
        </ContentTemplate>
    );
};

export default Page;
