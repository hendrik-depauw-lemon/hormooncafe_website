'use client';

import Image from 'next/image';
import * as React from 'react';

import { Link } from '../../i18n/navigation';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '../../shadcn/components/ui/navigation-menu';
import { useIsMobile } from '../../shadcn/hooks/use-mobile';

type HeaderProps = {
    navigation: { title: string; href: string }[];
};

export function Header({ navigation }: HeaderProps) {
    const isMobile = useIsMobile();

    return (
        <div className="w-full bg-primary">
            <NavigationMenu viewport={isMobile} className="mx-auto py-4">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={441}
                    height={190}
                    className="mx-4 object-contain h-10 w-fit"
                />
                <NavigationMenuList className="flex-wrap">
                    {navigation.map((item) => (
                        <NavigationMenuItem key={item.title}>
                            <NavigationMenuLink
                                asChild
                                className="text-md font-special data-[active=true]:text-primary-foreground hover:text-primary-foreground focus:text-primary-foreground data-[state=open]:text-primary-foreground"
                            >
                                <Link href={item.href}>{item.title}</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
