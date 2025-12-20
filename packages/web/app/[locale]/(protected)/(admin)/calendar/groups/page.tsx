import { Plus } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Views } from '../../../../../../src/components/organism/views/Views';
import { ContentTemplate } from '../../../../../../src/components/templates/ContentTemplate';
import { Button } from '../../../../../../src/shadcn/components/ui/button';
import { CalendarGroupsTable } from './_components/CalednarGroupsTable';

export const dynamic = 'force-dynamic';
export const fetchCache = 'default-no-store';

const Page: NextPage = async () => {
    const t = await getTranslations('calendar-groups.overview');

    return (
        <ContentTemplate
            title={t('title')}
            actions={
                <>
                    <Views />
                    <Button asChild>
                        <Link passHref href="/calendar/groups/new">
                            <Plus />
                            {t('actions.create')}
                        </Link>
                    </Button>
                </>
            }
        >
            <CalendarGroupsTable />
        </ContentTemplate>
    );
};

export default Page;
