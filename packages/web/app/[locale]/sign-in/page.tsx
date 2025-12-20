'use client';

import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { useRouter } from '@/src/i18n/navigation';

export default function Page() {
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session.status === 'loading') return;
        if (session.status === 'authenticated') router.push('/');
        signIn('cognito', { callbackUrl: '/' });
    }, [session, router]);

    return <></>;
}
