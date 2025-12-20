import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { ContentTemplate } from '../../../../../../src/components/templates/ContentTemplate';
import { Card, CardContent } from '../../../../../../src/shadcn/components/ui/card';
import { getClient } from '../../../../../../src/utils/urql/getURQLClient';
import { BookDetails } from './_components/BookDetails';
import { UpdateBookForm } from './_components/UpdateBookForm';
import { getBookQuery } from './_queries/getBook';

export const dynamic = 'force-dynamic';
export const fetchCache = 'default-no-store';

interface PageProps {
    params: Promise<{ id: string }>;
}

const Page: NextPage<PageProps> = async (props) => {
    const t = await getTranslations('book.details.0');
    const params = await props.params;
    const result = await getClient().query(getBookQuery, { id: params.id });
    const entity = result.data?.BookReadModel;
    if (!entity) notFound();

    return (
        <ContentTemplate
            title={t('title', { name: entity.title })}
            aside={<BookDetails initialValues={entity} />}
        >
            <Card>
                <CardContent>
                    <UpdateBookForm initialValues={entity} />
                </CardContent>
            </Card>
        </ContentTemplate>
    );
};

export default Page;
