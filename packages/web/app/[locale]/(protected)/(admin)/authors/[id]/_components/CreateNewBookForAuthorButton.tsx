'use client';

import { LucidePlus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { createDefaultValuesSearchParam } from '../../../../../../../src/components/organism/form/utils/default-values';
import { Link } from '../../../../../../../src/i18n/navigation';
import { Button } from '../../../../../../../src/shadcn/components/ui/button';

type CreateNewBookForAuthorButtonProps = {
    authorId: string;
};

export function CreateNewBookForAuthorButton({ authorId }: CreateNewBookForAuthorButtonProps) {
    const t = useTranslations('author.details.linked-books.actions');

    const bookFormValues = createDefaultValuesSearchParam({ authorIds: [authorId] });

    return (
        <Button asChild variant={'secondary'}>
            <Link passHref href={`/books/new?${bookFormValues}`}>
                <LucidePlus />
                {t('create')}
            </Link>
        </Button>
    );
}
