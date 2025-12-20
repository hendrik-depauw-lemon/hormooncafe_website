import { createNavigation } from 'next-intl/navigation';

import config from '@/src/configs/i18n.config';

const navigation = createNavigation(config);

export const { Link, useRouter, getPathname, usePathname, redirect, permanentRedirect } =
    navigation;
export default navigation;
