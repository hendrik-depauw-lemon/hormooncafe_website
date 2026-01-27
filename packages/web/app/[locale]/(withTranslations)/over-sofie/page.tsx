import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import RichText from '@/src/components/atoms/RichText';
import { H2 } from '@/src/components/atoms/typography/H2';

export default async function Page() {
    const t = await getTranslations('about-me-section');

    return (
        <div className="py-12 mx-2 md:mx-12 flex flex-col gap-6">
            <div className="flex flex-col gap-24">
                <div className="grid grid-cols-1 md:grid-cols-4 items-center">
                    <Image
                        src="/IMG_2277.jpg"
                        className="max-h-80 md:max-h-full h-full object-cover"
                        alt=""
                        width={2048}
                        height={1365}
                    />
                    <div className="p-8 flex flex-col justify-center gap-4 col-span-3">
                        <H2>{t('section-1.title')}</H2>
                        <RichText className="text-accent-foreground">
                            {(tags) => t.rich('section-1.content', tags)}
                        </RichText>
                        <p className="font-extrabold">{t('section-1.footer')}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 items-center">
                    <Image
                        src="/IMG_2287.jpg"
                        className="max-h-80 md:max-h-full h-full object-cover"
                        alt=""
                        width={2048}
                        height={1365}
                    />
                    <div className="p-8 flex flex-col justify-center gap-4 col-span-2">
                        <RichText className="text-accent-foreground">
                            {(tags) => t.rich('section-2.content-1', tags)}
                        </RichText>
                        <p className="font-extrabold">{t('section-2.mission')}</p>
                        <RichText className="text-accent-foreground">
                            {(tags) => t.rich('section-2.content-2', tags)}
                        </RichText>
                    </div>
                </div>
            </div>
            <H2 className="text-center">{t('footer')}</H2>
        </div>
    );
}
