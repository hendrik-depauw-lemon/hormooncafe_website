import type { Metadata } from 'next';
import Head from 'next/head';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { PropsWithChildren } from 'react';

import Analytics from '@/src/components/molecules/Analytics';
import Providers from '@/src/components/providers/GlobalProviders';
import { getDictionary } from '@/src/i18n/getDictionary';
import isSupportedLocale from '@/src/utils/i18n/isSupportedLocale';

import { TimeZoneCookie } from '../../src/components/atoms/TimeZoneCookie';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('common.metadata');

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function RootLayout(
    props: PropsWithChildren<{ params: Promise<{ locale: string }> }>,
) {
    if (!props) return null;
    const { params, children } = props;
    const { locale } = await params;
    const parsedLocale = isSupportedLocale(locale) ? locale : 'nl-BE';
    const messages = await getDictionary(parsedLocale);

    return (
        <html lang={parsedLocale} className="min-h-svh bg-gray-50">
            <Head>
                <link rel="stylesheet" href="https://use.typekit.net/gqj6nqu.css" />
            </Head>
            <Analytics />
            <TimeZoneCookie />
            <body className="h-full">
                <Providers>
                    <NextIntlClientProvider locale={locale} messages={messages}>
                        {children}
                    </NextIntlClientProvider>
                </Providers>
            </body>
        </html>
    );
}
