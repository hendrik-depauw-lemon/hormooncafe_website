import { defineRouting } from 'next-intl/routing';

import SupportedLocale from '@/src/types/i18n/SupportedLocale';

const defaultLocale: SupportedLocale = 'nl-BE';
enum SupportedLocales {
    'nl-BE',
}
const supportedLocales: SupportedLocale[] = Object.keys(SupportedLocales).filter((key) =>
    isNaN(Number(key)),
) as [keyof typeof SupportedLocales];

const config = defineRouting({
    locales: supportedLocales,
    defaultLocale,
});

export { defaultLocale, SupportedLocales, supportedLocales };
export default config;
