import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PropsWithChildren } from 'react';

import { Header } from '@/src/components/molecules/Header';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('common.metadata');

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function RootLayout({ children }: PropsWithChildren) {
    const t = await getTranslations('navigation');

    const navigation = [
        { title: t('home'), href: '/' },
        { title: t('workshops'), href: '/workshops' },
        { title: t('agenda'), href: '/agenda' },
        { title: t('about-sofie'), href: '/over-sofie' },
        { title: t('contact'), href: '/contact' },
    ];

    return (
        <>
            <Header navigation={navigation} />
            <div className="pb-12">{children}</div>
        </>
    );
}
