'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { usePathname } from '../../../../src/i18n/navigation';
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '../../../../src/shadcn/components/ui/breadcrumb';
import { Button } from '../../../../src/shadcn/components/ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '../../../../src/shadcn/components/ui/drawer';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../../../../src/shadcn/components/ui/dropdown-menu';
import { useMediaQuery } from '../../../../src/shadcn/hooks/use-media-query';

const ITEMS_TO_DISPLAY_AT_END = 2;

function splitItems<T>(items: Array<T>) {
    const hasFirst = items.length > 0;
    const firstItem = items[0];
    const afterFirstIndex = hasFirst ? 1 : 0;

    const tailCount = Math.max(0, Math.floor(ITEMS_TO_DISPLAY_AT_END));
    const lastStartIndex = Math.max(afterFirstIndex, items.length - tailCount);

    const dropdownItems = items.slice(afterFirstIndex, lastStartIndex);
    const lastItems = items.slice(lastStartIndex);
    return { firstItem, lastItems, dropdownItems };
}

export function Breadcrumbs() {
    const t = useTranslations('common.breadcrumbs');
    const pathname = usePathname();
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const items = React.useMemo(
        () =>
            pathname.split('/').reduce(
                (breadcrumbs, pathnameSegment) => {
                    const previousPathname = breadcrumbs.length
                        ? breadcrumbs[breadcrumbs.length - 1].href
                        : '';
                    breadcrumbs.push({
                        href: `${previousPathname}${pathnameSegment}/`,
                        label: pathnameSegment
                            ? t.has(`pages.${pathnameSegment}`)
                                ? t(`pages.${pathnameSegment}`)
                                : t('details')
                            : t('home'),
                    });
                    return breadcrumbs;
                },
                [] as { href: string; label: string }[],
            ),
        [pathname, t],
    );

    const { firstItem, lastItems, dropdownItems } = splitItems(items);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {!!firstItem && (
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href={firstItem.href}>{firstItem.label}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                )}
                {dropdownItems.length > 0 && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            {isDesktop ? (
                                <DropdownMenu open={open} onOpenChange={setOpen}>
                                    <DropdownMenuTrigger
                                        className="flex items-center gap-1"
                                        aria-label="Toggle menu"
                                    >
                                        <BreadcrumbEllipsis className="size-4" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        {dropdownItems.map((item, index) => (
                                            <DropdownMenuItem key={index}>
                                                <Link href={item.href ? item.href : '#'}>
                                                    {item.label}
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Drawer open={open} onOpenChange={setOpen}>
                                    <DrawerTrigger aria-label="Toggle Menu">
                                        <BreadcrumbEllipsis className="h-4 w-4" />
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <DrawerHeader className="text-left">
                                            <DrawerTitle>{t('drawer.title')}</DrawerTitle>
                                            <DrawerDescription>
                                                {t('drawer.description')}
                                            </DrawerDescription>
                                        </DrawerHeader>
                                        <div className="grid gap-1 px-4">
                                            {dropdownItems.map((item, index) => (
                                                <Link
                                                    key={index}
                                                    href={item.href ? item.href : '#'}
                                                    className="py-1 text-sm"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                        <DrawerFooter className="pt-4">
                                            <DrawerClose asChild>
                                                <Button variant="outline">
                                                    {t('drawer.close')}
                                                </Button>
                                            </DrawerClose>
                                        </DrawerFooter>
                                    </DrawerContent>
                                </Drawer>
                            )}
                        </BreadcrumbItem>
                    </>
                )}
                {lastItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild className="max-w-20 truncate md:max-w-none">
                                <Link href={item.href}>{item.label}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
