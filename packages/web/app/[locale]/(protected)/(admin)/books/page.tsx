import { Plus } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Views } from '../../../../../src/components/organism/views/Views';
import { ContentTemplate } from '../../../../../src/components/templates/ContentTemplate';
import { Button } from '../../../../../src/shadcn/components/ui/button';
import { BooksTable } from './_components/BooksTable';
import { SyncBooksButton } from './_components/SyncBooksButton';

export const dynamic = 'force-dynamic';
export const fetchCache = 'default-no-store';

const Page: NextPage = async () => {
    const t = await getTranslations('book.overview');

    return (
        <ContentTemplate
            title={t('0.title')}
            actions={
                <>
                    <Views />
                    <SyncBooksButton />
                    <Button asChild>
                        <Link passHref href="/books/new">
                            <Plus />
                            {t('actions.create')}
                        </Link>
                    </Button>
                </>
            }
        >
            <BooksTable />
        </ContentTemplate>
    );
};

export default Page;
