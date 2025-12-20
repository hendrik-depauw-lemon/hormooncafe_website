import { authExchange as urqlAuthExchange } from '@urql/exchange-auth';
import { registerUrql } from '@urql/next/rsc';
import { getServerSession } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import { toast } from 'sonner';
import {
    cacheExchange,
    type Client,
    createClient,
    errorExchange,
    fetchExchange,
    ssrExchange,
} from 'urql/core';
import { z } from 'zod';

import nextAuthConfig from '@/src/configs/next-auth.config';
import { dateExchange } from '@/src/utils/urql/dateExchange';

const getURQLClient: () => Client = () => {
    const isClient = typeof window !== 'undefined';
    const apiUrl = z.string().parse(process.env.NEXT_PUBLIC_API_URL);

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

    const ssr = ssrExchange({ isClient });

    const client = createClient({
        url: apiUrl,
        requestPolicy: 'network-only',
        exchanges: [
            cacheExchange,
            ssr,
            authExchange,
            dateExchange,
            errorExchange({
                onError: (error) => {
                    const errorToaster = toast.error;
                    if (typeof errorToaster === 'function') {
                        // Client-side
                        errorToaster(error.message);
                    } else {
                        // Server-side
                        console.error(`ErrorExchange: ${error.message}`);
                    }
                },
            }),
            fetchExchange,
        ],
    });

    return client;
};

export const { getClient } = registerUrql(() => getURQLClient());
