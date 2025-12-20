// eslint-disable-next-line no-restricted-imports
import { getLocale as getNextIntlLocale } from 'next-intl/server';

import { defaultLocale } from '@/src/configs/i18n.config';
import supportedLocaleSchema from '@/src/i18n/supportedLocaleSchema';
import SupportedLocale from '@/src/types/i18n/SupportedLocale';

const getLocale = async (): Promise<SupportedLocale> => {
    const locale = await getNextIntlLocale();
    const { success, data } = await supportedLocaleSchema.safeParseAsync(locale);
    if (!success) return defaultLocale;
    return data;
};
export default getLocale;
