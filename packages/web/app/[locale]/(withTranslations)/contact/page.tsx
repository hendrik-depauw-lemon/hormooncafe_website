import { getTranslations } from 'next-intl/server';

import { H2 } from '../../../../src/components/atoms/typography/H2';

export default async function Page() {
    const t = await getTranslations('contact-section');

    return (
        <div className="pt-12 flex flex-col text-center gap-12 mb-36">
            <H2>{t('title')}</H2>
            <div className="flex flex-col">
                <span className="font-special text-accent-foreground">{t('action')}</span>
                <a
                    className="font-special text-accent-foreground"
                    href="mailto:info@hormooncafe.be"
                >
                    info@hormooncafe.be
                </a>
            </div>
        </div>
    );
}
