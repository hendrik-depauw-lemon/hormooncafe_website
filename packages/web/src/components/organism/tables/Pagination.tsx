import _, { uniq } from 'lodash';
import { useTranslations } from 'next-intl';

import {
    Pagination as ShadcnPagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/src/shadcn/components/ui/pagination';

import { cn } from '../../../shadcn/lib/utils';
import { Small } from '../../atoms/typography/Small';

type PaginationProps = {
    currentPageIndex: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    onPreviousPage: () => void;
    onNextPage: () => void;
    onSetPage: (index: number) => void;
};

export function Pagination({
    currentPageIndex,
    pageSize,
    totalItems,
    totalPages,
    onPreviousPage,
    onNextPage,
    onSetPage,
}: PaginationProps) {
    const t = useTranslations('common.pagination');

    const previousPageDisabled = currentPageIndex === 0;
    const nextPageDisabled =
        currentPageIndex === Math.ceil(totalItems / pageSize) - 1 || totalItems === 0;

    const range = _.range(0, totalPages);
    const surroundingPages = [currentPageIndex - 1, currentPageIndex, currentPageIndex + 1].filter(
        (page) => page > 0 && page < totalPages,
    );

    const fillWithEllipsesIfNeeded = (list: number[]) => {
        if (list.length < 3) return list;
        if (list.length === 4 && list[2] - list[1] !== 1) return list.toSpliced(2, 0, -1);
        if (list[1] - list[0] !== 1) list.splice(1, 0, -1);
        if (list[list.length - 1] - list[list.length - 2] !== 1)
            list.splice(list.length - 1, 0, -1);
        return list;
    };

    const pages =
        range.length > 5
            ? fillWithEllipsesIfNeeded(
                  uniq(range.toSpliced(1, totalPages - 2, ...surroundingPages)),
              )
            : range;
    return (
        <ShadcnPagination className="justify-end">
            <PaginationContent className="gap-2">
                <Small>
                    {t('results', {
                        from: totalItems === 0 ? 0 : currentPageIndex * pageSize + 1,
                        to: Math.min((currentPageIndex + 1) * pageSize, totalItems),
                        total: totalItems,
                    })}
                </Small>
                <PaginationItem>
                    <PaginationPrevious
                        size="default"
                        className={cn(
                            '*:font-aeonik border-0 shadow-none',
                            previousPageDisabled ? 'opacity-50' : '',
                        )}
                        isActive={!previousPageDisabled}
                        onClick={previousPageDisabled ? undefined : onPreviousPage}
                    />
                </PaginationItem>
                {pages.map((page, i) => (
                    <PaginationItem key={`${page}-${i}`}>
                        <PaginationLink
                            size="default"
                            isActive={page !== -1}
                            onClick={() => {
                                onSetPage(page);
                            }}
                            className={cn(
                                'font-aeonik shadow-none',
                                page === currentPageIndex ? 'border border-foreground' : 'border-0',
                            )}
                        >
                            {page === -1 ? '...' : page + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        size="default"
                        className={cn(
                            '*:font-aeonik border-0 shadow-none',
                            nextPageDisabled ? 'opacity-50' : '',
                        )}
                        isActive={!nextPageDisabled}
                        onClick={nextPageDisabled ? undefined : onNextPage}
                    />
                </PaginationItem>
            </PaginationContent>
        </ShadcnPagination>
    );
}
