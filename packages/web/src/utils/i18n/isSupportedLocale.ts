import { supportedLocales } from '@/src/configs/i18n.config';
import SupportedLocale from '@/src/types/i18n/SupportedLocale';

const isSupportedLocale = (locale: string): locale is SupportedLocale =>
    supportedLocales.includes(locale as SupportedLocale);

export default isSupportedLocale;
