import 'cronstrue/locales/nl';

import cronstrue from 'cronstrue';
import { useTranslations } from 'next-intl';

import useLocale from '../../../../../../../src/hooks/useLocale';

type ScheduleDescriptionProps = {
    schedule?: string;
};

export function ScheduleDescription({ schedule }: ScheduleDescriptionProps) {
    const t = useTranslations('scheduled-job.schedule-description');
    const locale = useLocale();

    if (!schedule) return null;

    try {
        return <>{cronstrue.toString(schedule, { locale: locale.split('-')[0] })}</>;
    } catch {
        return <>{t('invalid')}</>;
    }
}
