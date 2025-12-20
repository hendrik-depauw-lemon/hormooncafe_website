// Use type safe message keys with `next-intl`
import enUS from '@/src/i18n/dictionaries/en-US.json';
import nlBE from '@/src/i18n/dictionaries/nl-BE.json';

type Messages = typeof nlBE & typeof enUS;
declare global {
    interface IntlMessages extends Messages {}
}
