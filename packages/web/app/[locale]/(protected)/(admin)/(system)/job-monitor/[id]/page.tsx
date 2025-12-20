import { NextPage } from 'next';

import { Job } from '@/app/[locale]/(protected)/(admin)/(system)/job-monitor/[id]/_components/Job';

export const dynamic = 'force-dynamic';
export const fetchCache = 'default-no-store';

interface PageProps {
    params: Promise<{ id: string }>;
}

const Page: NextPage<PageProps> = async (props) => {
    const params = await props.params;

    return <Job jobId={params.id} />;
};

export default Page;
