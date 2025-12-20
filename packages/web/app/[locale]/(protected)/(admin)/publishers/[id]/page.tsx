import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { ContentTemplate } from '../../../../../../src/components/templates/ContentTemplate';
import { Card, CardContent } from '../../../../../../src/shadcn/components/ui/card';
import { getClient } from '../../../../../../src/utils/urql/getURQLClient';
import { PublisherDetails } from './_components/PublisherDetails';
import { UpdatePublisherForm } from './_components/UpdatePublisherForm';
import { getPublisherQuery } from './_queries/getPublisher';

export const dynamic = 'force-dynamic';
export const fetchCache = 'default-no-store';

interface PageProps {
    params: Promise<{ id: string }>;
}

const Page: NextPage<PageProps> = async (props) => {
    const t = await getTranslations('publisher.details.0');
    const params = await props.params;
    const result = await getClient().query(getPublisherQuery, { id: params.id });
    const entity = result.data?.PublisherReadModel;
    if (!entity) notFound();

    return (
        <ContentTemplate
            title={t('title', { name: entity.name })}
            aside={<PublisherDetails initialValues={entity} />}
        >
            <Card>
                <CardContent>
                    <UpdatePublisherForm initialValues={entity} />
                </CardContent>
            </Card>
        </ContentTemplate>
    );
};

export default Page;
