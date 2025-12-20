'use client';

import { RefreshCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMutation } from 'urql';

import { useRouter } from '@/src/i18n/navigation';
import { Button } from '@/src/shadcn/components/ui/button';
import { cn } from '@/src/shadcn/lib/utils';

import { syncBooksMutation } from '../_actions/syncBooks';

export function SyncBooksButton() {
    const t = useTranslations('book.overview.actions');
    const router = useRouter();

    const [{ fetching: isPending }, syncBooks] = useMutation(syncBooksMutation);

    const handleSync = async () => {
        await syncBooks({});
        router.push('/job-monitor');
    };

    return (
        <Button variant="secondary" onClick={handleSync} disabled={isPending}>
            <RefreshCcw className={cn({ 'animate-spin': isPending })} />
            {t('sync')}
        </Button>
    );
}
