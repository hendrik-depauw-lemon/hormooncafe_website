import { Plus } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Views } from '../../../../../src/components/organism/views/Views';
import { ContentTemplate } from '../../../../../src/components/templates/ContentTemplate';
import { Button } from '../../../../../src/shadcn/components/ui/button';
import { AuthorsTable } from './_components/AuthorsTable';

export const dynamic = 'force-dynamic';
export const fetchCache = 'default-no-store';

const Page: NextPage = async () => {
    const t = await getTranslations('author.overview');

    return (
        <ContentTemplate
            title={t('0.title')}
            actions={
                <>
                    <Views />
                    <Button asChild>
                        <Link passHref href="/authors/new">
                            <Plus />
                            {t('actions.create')}
                        </Link>
                    </Button>
                </>
            }
        >
            <AuthorsTable />
        </ContentTemplate>
    );
};

export default Page;
