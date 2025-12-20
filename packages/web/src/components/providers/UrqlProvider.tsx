'use client';

import { UrqlProvider as NativeUrqlProvider } from '@urql/next';
import { PropsWithChildren } from 'react';

import useClientSideUrqlClient from '@/src/hooks/useClientSideUrqlClient';

export function UrqlProvider({ children }: PropsWithChildren) {
    const { client, ssr } = useClientSideUrqlClient();

    return (
        <NativeUrqlProvider client={client} ssr={ssr}>
            {children}
        </NativeUrqlProvider>
    );
}
