import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { ContentTemplate } from '../../../../../../src/components/templates/ContentTemplate';
import { SubContentTemplate } from '../../../../../../src/components/templates/SubContentTemplate';
import { Card, CardContent } from '../../../../../../src/shadcn/components/ui/card';
import { getClient } from '../../../../../../src/utils/urql/getURQLClient';
import { AuthorDetails } from './_components/AuthorDetails';
import { BooksForAuthorTable } from './_components/BooksForAuthorTable';
import { CreateNewBookForAuthorButton } from './_components/CreateNewBookForAuthorButton';
import { UpdateAuthorForm } from './_components/UpdateAuthorForm';
import { getAuthorQuery } from './_queries/getAuthor';

export const dynamic = 'force-dynamic';
export const fetchCache = 'default-no-store';

interface PageProps {
    params: Promise<{ id: string }>;
}

const Page: NextPage<PageProps> = async (props) => {
    const t = await getTranslations('author.details');
    const params = await props.params;
    const result = await getClient().query(getAuthorQuery, { id: params.id });
    const entity = result.data?.AuthorReadModel;
    if (!entity) notFound();

    return (
        <>
            <ContentTemplate
                title={t('0.title', { name: entity.name })}
                aside={<AuthorDetails initialValues={entity} />}
            >
                <Card>
                    <CardContent>
                        <UpdateAuthorForm initialValues={entity} />
                    </CardContent>
                </Card>
            </ContentTemplate>
            <SubContentTemplate
                title={t('linked-books.title')}
                actions={<CreateNewBookForAuthorButton authorId={entity.id} />}
            >
                <BooksForAuthorTable authorId={entity.id} />
            </SubContentTemplate>
        </>
    );
};

export default Page;
