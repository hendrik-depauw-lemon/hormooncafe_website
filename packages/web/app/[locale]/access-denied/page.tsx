'use client';

import { Ban } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '../../../src/i18n/navigation';
import { Button } from '../../../src/shadcn/components/ui/button';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '../../../src/shadcn/components/ui/empty';

export default function Page() {
    const t = useTranslations('access-denied');

    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <Ban />
                    </EmptyMedia>
                    <EmptyTitle>{t('title')}</EmptyTitle>
                    <EmptyDescription>{t('description')}</EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <div className="flex justify-center gap-2">
                        <Button asChild>
                            <Link passHref href="/">
                                {t('actions.go-to-home-page')}
                            </Link>
                        </Button>
                        <Button asChild variant="secondary">
                            <Link passHref href="/sign-out">
                                {t('actions.sign-out')}
                            </Link>
                        </Button>
                    </div>
                </EmptyContent>
            </Empty>
        </div>
    );
}
