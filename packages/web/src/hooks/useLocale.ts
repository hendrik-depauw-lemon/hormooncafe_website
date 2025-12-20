// eslint-disable-next-line no-restricted-imports
import { useLocale as useNextIntlLocale } from 'next-intl';

import { defaultLocale } from '@/src/configs/i18n.config';
import supportedLocaleSchema from '@/src/i18n/supportedLocaleSchema';

const useLocale = () => {
    const locale = useNextIntlLocale();
    const { success, data } = supportedLocaleSchema.safeParse(locale);
    if (!success) return defaultLocale;
    return data;
};
export default useLocale;
