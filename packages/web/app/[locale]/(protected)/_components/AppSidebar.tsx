import {
    Building2,
    Calendar,
    ChevronUp,
    Gauge,
    LayoutDashboard,
    Library,
    LogOut,
    User2,
    UserPen,
} from 'lucide-react';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { getTranslations } from 'next-intl/server';

import { RunningJobCounter } from '@/src/components/molecules/running-job-counter/RunningJobCounter';
import VersionComponent from '@/src/components/organism/version-component/VersionComponent';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/src/shadcn/components/ui/sidebar';

import { Muted } from '../../../../src/components/atoms/typography/Muted';
import { Small } from '../../../../src/components/atoms/typography/Small';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../../../../src/shadcn/components/ui/dropdown-menu';

export async function AppSidebar() {
    const t = await getTranslations('main-navigation');
    const session = await getServerSession();

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Image src="/favicon.ico" alt="logo" width={32} height={32} />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <Small>{t('header.title')}</Small>
                                    <Muted>{t('header.subtitle')}</Muted>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/dashboard">
                                        <LayoutDashboard />
                                        <span>{t('dashboard.title')}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/authors">
                                        <UserPen />
                                        <span>{t('authors.title')}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/publishers">
                                        <Building2 />
                                        <span>{t('publishers.title')}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/books">
                                        <Library />
                                        <span>{t('books.title')}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>{t('system.title')}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/scheduled-jobs">
                                        <Calendar />
                                        <span>{t('system.scheduled-jobs.title')}</span>
                                    </a>
                                </SidebarMenuButton>
                                <SidebarMenuBadge>
                                    <RunningJobCounter />
                                </SidebarMenuBadge>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/job-monitor">
                                        <Gauge />
                                        <span>{t('system.jobs.title')}</span>
                                    </a>
                                </SidebarMenuButton>
                                <SidebarMenuBadge>
                                    <RunningJobCounter />
                                </SidebarMenuBadge>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>{t('calendar.title')}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/calendar">
                                        <Library />
                                        <span>{t('calendar.overview.title')}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="/calendar/groups">
                                        <Library />
                                        <span>{t('calendar.groups.title')}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 /> {session?.user.email}
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[var(--radix-popper-anchor-width)]"
                            >
                                <DropdownMenuItem asChild>
                                    <div className="px-2 py-1.5">
                                        <VersionComponent />
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <a href="/sign-out">
                                        <LogOut />
                                        <span>{t('user.sign-out.title')}</span>
                                    </a>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
