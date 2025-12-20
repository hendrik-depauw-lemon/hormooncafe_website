import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { Role } from '@/src/gql/generated/graphql';
import { hasPermissions } from '@/src/utils/permissions/hasPermissions';

const Layout = async ({ children }: PropsWithChildren) => {
    const permitted = await hasPermissions([Role.SuperAdmin]);
    if (!permitted) return redirect('/access-denied');
    return children;
};

export default Layout;
