import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export default async function Page() {
    const t = await getTranslations('contact-section');

    return (
        <div className="pt-12 flex flex-col text-center gap-12 mb-36">
            {/* <H2>{t('title')}</H2> */}
            <Image
                src="/IMG_2287.jpg"
                className="max-h-80 object-contain mx-auto"
                alt=""
                width={2048}
                height={1365}
            />
            <div className="flex flex-col">
                <span className="font-special font-bold text-accent-foreground">{t('action')}</span>
                <a
                    className="font-special font-bold text-accent-foreground underline"
                    href="mailto:info@hormooncafe.be"
                >
                    info@hormooncafe.be
                </a>
            </div>
        </div>
    );
}
