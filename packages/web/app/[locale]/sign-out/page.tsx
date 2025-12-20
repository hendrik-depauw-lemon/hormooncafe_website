'use client';

import { signOut } from 'next-auth/react';
import { useCallback, useEffect } from 'react';

import { LoadingSpinner } from '@/src/components/atoms/LoadingSpinner';
import { signOutCallbackUrl } from '@/src/configs/next-auth.config';

export default function Page() {
    const signOutAndRedirect = useCallback(async () => {
        await signOut({
            redirect: true,
            callbackUrl: signOutCallbackUrl(window.location.origin),
        });
    }, []);

    useEffect(() => {
        void signOutAndRedirect();
    }, [signOutAndRedirect]);

    return (
        <div className="flex h-screen items-center justify-center">
            <LoadingSpinner className="size-16" />
        </div>
    );
}
