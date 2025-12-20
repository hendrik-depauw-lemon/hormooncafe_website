import { useTranslations } from 'next-intl';

import { Small } from '../../atoms/typography/Small';

export function FilterNotSupported() {
    const t = useTranslations('common.filters');

    return <Small>{t('not-supported')}</Small>;
}
