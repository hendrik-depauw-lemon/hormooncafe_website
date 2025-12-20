import { ArrowUpDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '../../../shadcn/components/ui/button';

type SortingButtonProps = {
    isSorted: 'asc' | 'desc';
    onClick: () => void;
};

export function SortingButton({ isSorted, onClick }: SortingButtonProps) {
    const t = useTranslations('common.activity-log.sorting');

    return (
        <Button variant="outline" className="w-full" size="sm" onClick={onClick}>
            <ArrowUpDown /> {isSorted === 'asc' ? t('asc') : t('desc')}
        </Button>
    );
}
