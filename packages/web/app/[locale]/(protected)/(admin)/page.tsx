import getLocale from '@/src/i18n/getLocale';
import { redirect } from '@/src/i18n/navigation';

export default async function Page() {
    const locale = await getLocale();
    redirect({ href: '/books', locale });
}
