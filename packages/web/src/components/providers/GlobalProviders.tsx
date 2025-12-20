'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import type { FC, PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

import { UrqlProvider } from '@/src/components/providers/UrqlProvider';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface GlobalProvidersProps {}
const GlobalProviders: FC<PropsWithChildren<GlobalProvidersProps>> = ({ children }) => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <NuqsAdapter defaultOptions={{ shallow: true, clearOnDefault: true, scroll: false }}>
                <SessionProvider>
                    <UrqlProvider>
                        {children}
                        <Toaster />
                    </UrqlProvider>
                </SessionProvider>
            </NuqsAdapter>
        </QueryClientProvider>
    );
};

export type { GlobalProvidersProps };
export default GlobalProviders;
