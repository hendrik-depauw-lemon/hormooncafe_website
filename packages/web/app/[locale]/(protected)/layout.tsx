import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { PropsWithChildren } from 'react';

import nextAuthConfig from '@/src/configs/next-auth.config';

import { PageTemplate } from '../../../src/components/templates/PageTemplate';
import { SidebarInset, SidebarProvider } from '../../../src/shadcn/components/ui/sidebar';
import { AppSidebar } from './_components/AppSidebar';
import { Header } from './_components/Header';

export default async function RootLayout(props: PropsWithChildren) {
    const session = await getServerSession(nextAuthConfig);
    if (!session) return redirect('/sign-in');
    const { children } = props;

    return (
        <SidebarProvider defaultOpen={true}>
            <AppSidebar />
            <SidebarInset className="overflow-hidden">
                <Header />
                <PageTemplate>{children}</PageTemplate>
            </SidebarInset>
        </SidebarProvider>
    );
}
