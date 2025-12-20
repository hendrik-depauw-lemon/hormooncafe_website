import { authExchange as urqlAuthExchange } from '@urql/exchange-auth';
import {
    cacheExchange,
    createClient,
    fetchExchange,
    ssrExchange,
    subscriptionExchange,
} from '@urql/next';
import { getServerSession } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import { useMemo } from 'react';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { z } from 'zod';

import { dateExchange } from '@/src/utils/urql/dateExchange';

import nextAuthConfig from '../configs/next-auth.config';

export default function useClientSideUrqlClient() {
    const isClient = typeof window !== 'undefined';
    const apiUrl = z.string().parse(process.env.NEXT_PUBLIC_API_URL);
    const apiSubscriptionUrl = z.string().parse(process.env.NEXT_PUBLIC_SUBSCRIPTION_API_URL);

    const authExchange = urqlAuthExchange(async (utils) => {
        let token: JWT['access_token'] | undefined = undefined;
        const getToken = isClient
            ? async () => (await getSession())?.user.token
            : async () => (await getServerSession(nextAuthConfig))?.user.token;
        const refreshToken = async () => {
            token = await getToken();
        };
        await refreshToken();
        return {
            addAuthToOperation: (operation) => {
                if (!token) return operation;
                return utils.appendHeaders(operation, { Authorization: `Bearer ${token}` });
            },
            refreshAuth: () => refreshToken(),
            didAuthError: () => false,
            willAuthError: () => true,
        };
    });

    const subscriptionClient = new SubscriptionClient(apiSubscriptionUrl, { reconnect: true });
    const ssr = ssrExchange({ isClient });

    const client = createClient({
        url: apiUrl,
        requestPolicy: 'network-only',
        exchanges: [
            cacheExchange,
            authExchange,
            dateExchange,
            ssr,
            fetchExchange,
            subscriptionExchange({
                forwardSubscription: (request) => subscriptionClient.request(request),
            }),
        ],
    });

    const result = useMemo(() => ({ client, ssr }), [client, ssr]);

    return result;
}
