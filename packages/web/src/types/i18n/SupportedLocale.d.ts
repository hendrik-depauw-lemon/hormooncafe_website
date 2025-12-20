import type { SupportedLocales } from '@/src/configs/i18n.config';

type SupportedLocale = keyof typeof SupportedLocales;
export default SupportedLocale;
