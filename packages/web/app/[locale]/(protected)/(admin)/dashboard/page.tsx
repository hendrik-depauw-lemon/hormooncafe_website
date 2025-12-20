import { NextPage } from 'next';
import { getTranslations } from 'next-intl/server';
import z from 'zod';

import { MongoDashboard } from '../../../../../src/components/organism/MongoDashboard';
import { ContentTemplate } from '../../../../../src/components/templates/ContentTemplate';

export const dynamic = 'force-dynamic';
export const fetchCache = 'default-no-store';

const dashboardId = z.string().nonempty().parse(process.env.NEXT_PUBLIC_MONGO_DASHBOARD_ID);

const Page: NextPage = async () => {
    const t = await getTranslations('dashboard');

    return (
        <ContentTemplate title={t('title')}>
            <div className="h-[85dvh]">
                <MongoDashboard dashboardId={dashboardId} />
            </div>
        </ContentTemplate>
    );
};

export default Page;
