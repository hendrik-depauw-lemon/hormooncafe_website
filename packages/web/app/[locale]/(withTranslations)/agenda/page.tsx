import { getTranslations } from 'next-intl/server';

import { H2 } from '../../../../src/components/atoms/typography/H2';
import { Link } from '../../../../src/i18n/navigation';
import { Button } from '../../../../src/shadcn/components/ui/button';

export default async function Page() {
    const t = await getTranslations('agenda-section');

    return (
        <>
            <div className="pt-12 mx-2 md:mx-12 flex flex-col gap-4">
                <H2 className="whitespace-pre-wrap">{t('1.title')}</H2>
                <p className="whitespace-pre-wrap text-accent-foreground">{t('1.content')}</p>
                <Button asChild className="w-full px-8 py-6">
                    <Link href="mailto:info@hormooncafe.be?subject=Inschrijving hormooncafe&body=Hierbij bevestig ik mijn inschrijving voor het hormooncafé dat plaatsvindt op 22 maart 2026.">
                        {t('1.button')}
                    </Link>
                </Button>
            </div>
            <div className="pt-12 mx-2 md:mx-12 flex flex-col gap-4">
                <H2 className="whitespace-pre-wrap">{t('2.title')}</H2>
                <p className="whitespace-pre-wrap text-accent-foreground">{t('2.content')}</p>
                <Button asChild className="w-full px-8 py-6">
                    <Link href="mailto:info@hormooncafe.be?subject=Inschrijving hormooncafe&body=Hierbij bevestig ik mijn inschrijving voor het hormooncafé dat plaatsvindt op 11 april 2026.">
                        {t('2.button')}
                    </Link>
                </Button>
            </div>
        </>
    );
}
