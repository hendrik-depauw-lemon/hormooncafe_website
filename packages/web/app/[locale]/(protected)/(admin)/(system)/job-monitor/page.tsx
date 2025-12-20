import { Play } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { ContentTemplate } from '../../../../../../src/components/templates/ContentTemplate';
import { Button } from '../../../../../../src/shadcn/components/ui/button';
import { JobExecutionsTable } from './_components/JobExecutionsTable';

export const dynamic = 'force-dynamic';
export const fetchCache = 'default-no-store';

const Page: NextPage = async () => {
    const t = await getTranslations('job.overview');

    return (
        <ContentTemplate
            title={t('0.title')}
            actions={
                <Button asChild>
                    <Link passHref href="/job-monitor/execute">
                        <Play />
                        {t('0.actions.execute')}
                    </Link>
                </Button>
            }
        >
            <JobExecutionsTable />
        </ContentTemplate>
    );
};

export default Page;
