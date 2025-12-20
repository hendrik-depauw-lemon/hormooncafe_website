import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

import { defaultLocale } from '@/src/configs/i18n.config';
import { getDictionary } from '@/src/i18n/getDictionary';
import isSupportedLocale from '@/src/utils/i18n/isSupportedLocale';

const requestConfig = getRequestConfig(async ({ requestLocale }) => {
    const cookieStore = await cookies();
    const timeZone = cookieStore.get('NEXT_TIMEZONE')?.value || 'Europe/Brussels';

    const awaitedRequestLocale = await requestLocale;
    const locale =
        awaitedRequestLocale && isSupportedLocale(awaitedRequestLocale)
            ? awaitedRequestLocale
            : defaultLocale;

    return {
        locale: locale,
        messages: await getDictionary(locale),
        timeZone,
    };
});

export default requestConfig;
