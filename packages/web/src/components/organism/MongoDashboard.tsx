'use client';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import { getSession } from 'next-auth/react';
import { useCallback, useMemo } from 'react';
import z from 'zod';

const sdk = new ChartsEmbedSDK({
    baseUrl: z.string().nonempty().parse(process.env.NEXT_PUBLIC_MONGO_DASHBOARD_URL),
    async getUserToken() {
        const session = await getSession();
        return session?.user.token ?? '';
    },
});

type MongoDashboardProps = {
    dashboardId: string;
};

/**
 * Embed a mongoDB Atlas dashboard.
 * For this to work the following env vars need to be set:
 * - NEXT_PUBLIC_DASHBOARD_URL
 * - NEXT_PUBLIC_DASHBOARD_ID
 *
 * If this dashboard is authenticated (which it should be) ensure
 * That to create a custom auth provider in mongo atlas with the following properties:
 * - Custom JSON Webtoken
 * - Algorithm: RS256
 * - Copy the JWKS URI from the API
 */
export function MongoDashboard({ dashboardId }: MongoDashboardProps) {
    const dashboard = useMemo(
        () =>
            sdk.createDashboard({
                dashboardId: dashboardId,
                widthMode: 'scale',
                heightMode: 'fixed',
                background: 'transparant',
                showAttribution: false,
            }),
        [dashboardId],
    );

    const renderDashboard = useCallback(
        (ref: HTMLDivElement) => {
            if (ref) {
                dashboard.render(ref);
            }
        },
        [dashboard],
    );
    return <div ref={renderDashboard} className="h-full w-full"></div>;
}
