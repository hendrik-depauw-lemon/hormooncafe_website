import { Plus } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { ContentTemplate } from '../../../../../src/components/templates/ContentTemplate';
import { Button } from '../../../../../src/shadcn/components/ui/button';
import { PublishersTable } from './_components/PublishersTable';

export const dynamic = 'force-dynamic';
export const fetchCache = 'default-no-store';

const Page: NextPage = async () => {
    const t = await getTranslations('publisher.overview');

    return (
        <ContentTemplate
            title={t('0.title')}
            actions={
                <Button asChild>
                    <Link passHref href="/publishers/new">
                        <Plus />
                        {t('actions.create')}
                    </Link>
                </Button>
            }
        >
            <PublishersTable />
        </ContentTemplate>
    );
};

export default Page;
