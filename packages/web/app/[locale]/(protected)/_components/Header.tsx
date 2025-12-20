'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';

import { useRouter } from '../../../../src/i18n/navigation';
import { Button } from '../../../../src/shadcn/components/ui/button';
import { Separator } from '../../../../src/shadcn/components/ui/separator';
import { SidebarTrigger } from '../../../../src/shadcn/components/ui/sidebar';
import { Breadcrumbs } from './BreadCrumbs';

export function Header() {
    const router = useRouter();

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Button size="icon" variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => router.forward()}>
                    <ArrowRight />
                </Button>
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumbs />
            </div>
        </header>
    );
}
