import { getTranslations } from 'next-intl/server';

import { H2 } from '../../../../src/components/atoms/typography/H2';
import { Link } from '../../../../src/i18n/navigation';
import { Button } from '../../../../src/shadcn/components/ui/button';

export default async function Page() {
    const t = await getTranslations('agenda-section');

    return (
        <div className="pt-12 mx-2 md:mx-12 flex flex-col gap-4">
            <H2 className="whitespace-pre-wrap">{t('title')}</H2>
            <p className="whitespace-pre-wrap text-accent-foreground">{t('content')}</p>
            <Button asChild className="w-full px-8 py-6">
                <Link href="mailto:info@hormooncafe.be?subject=Inschrijving hormooncafe&body=Hierbij bevestig ik mijn inschrijving voor het hormooncafé dat plaatsvindt op 1 februari 2026.">
                    {t('button')}
                </Link>
            </Button>
        </div>
    );
}
