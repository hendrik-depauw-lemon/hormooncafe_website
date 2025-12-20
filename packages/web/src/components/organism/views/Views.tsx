'use client';

import { ChevronDown, Eye, Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMutation, useQuery } from 'urql';

import { usePathname, useRouter } from '../../../i18n/navigation';
import { Button } from '../../../shadcn/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../../../shadcn/components/ui/dropdown-menu';
import { removeViewMutation } from './_actions/removeView';
import { CreateViewButton } from './_components/CreateViewButton';
import { getMyViewsForPathnameQuery } from './_queries/getMyViewsForPathName';

export function Views() {
    const t = useTranslations('common.views');
    const pathname = usePathname();
    const router = useRouter();

    const [{ fetching, data }, refetchViews] = useQuery({
        query: getMyViewsForPathnameQuery,
        variables: { pathname },
    });

    const [_, removeView] = useMutation(removeViewMutation);

    const onRemoveView = async (id: string) => {
        await removeView({ input: { id } });
        refetchViews();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" disabled={fetching}>
                    <Eye />
                    {t('button.label')}
                    <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-60">
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <CreateViewButton onClose={refetchViews} />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {data?.GetMyViewsForPathname.length === 0 && (
                    <DropdownMenuLabel>{t('empty')}</DropdownMenuLabel>
                )}
                {data?.GetMyViewsForPathname.map((view) => (
                    <DropdownMenuItem
                        key={view.id}
                        className="flex flex-row justify-between"
                        onSelect={() => router.push(`${view.pathname}?${view.searchParams}`)}
                    >
                        {view.name}
                        <Button
                            size="sm"
                            variant="ghost"
                            className="size-3"
                            onClick={(e) => {
                                e.preventDefault();
                                onRemoveView(view.id);
                            }}
                        >
                            <Trash />
                        </Button>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
