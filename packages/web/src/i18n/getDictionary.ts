import { AbstractIntlMessages } from 'next-intl';

import SupportedLocale from '@/src/types/i18n/SupportedLocale';

export async function getDictionary(locale: SupportedLocale): Promise<AbstractIntlMessages> {
    try {
        return (await import(`./dictionaries/${locale}.json`)).default;
    } catch (error) {
        throw new Error(`Dictionary for locale "${locale}" not found`, { cause: error });
    }
}
