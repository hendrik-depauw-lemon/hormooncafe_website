import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import RichText from '../../../../src/components/atoms/RichText';
import { H2 } from '../../../../src/components/atoms/typography/H2';
import { Lead } from '../../../../src/components/atoms/typography/Lead';
import { Link } from '../../../../src/i18n/navigation';
import { Button } from '../../../../src/shadcn/components/ui/button';

export default async function Page() {
    const t = await getTranslations('workshops-section');

    return (
        <div className="flex flex-col gap-24 items-center pt-12">
            <div className="flex flex-col gap-12 items-center">
                <H2>{t('title')}</H2>
                <div className="flex flex-col md:flex-row lg:justify-between gap-12 text-primary-foreground px-2 md:px-12">
                    {['1', '2', '3'].map((num) => (
                        <div
                            key={num}
                            className="w-full lg:basis-1/3 bg-primary rounded-md text-center"
                        >
                            <div className="bg-secondary rounded-md py-8">
                                <span className="font-special font-bold">
                                    {t(`card-${num}.title`)}
                                </span>
                            </div>
                            <div className="p-6">
                                <p>{t(`card-${num}.content`)}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <Lead className="text-secondary font-special font-bold text-base text-center">
                    {t('footer')}
                </Lead>
            </div>

            <div className="grid grid-cols-6 gap-2 md:gap-12 text-center text-primary-foreground font-special font-bold mx-2 md:mx-12 md:break-normal">
                <div className="col-start-2 col-span-2 bg-primary rounded-md py-4 px-2">
                    {t('spider.content-1')}
                </div>
                <div className="col-start-4 col-span-2 bg-primary rounded-md py-4 px-2">
                    {t('spider.content-2')}
                </div>
                <div className="col-start-1 col-span-2 bg-primary rounded-md py-4 px-2">
                    {t('spider.content-3')}
                </div>
                <div className="col-start-3 col-span-2 text-secondary py-4 px-2 text-lg">
                    {t('spider.title')}
                </div>
                <div className="col-start-5 col-span-2 bg-primary rounded-md py-4 px-2">
                    {t('spider.content-4')}
                </div>
                <div className="col-start-2 col-span-2 bg-primary rounded-md py-4 px-2">
                    {t('spider.content-5')}
                </div>
                <div className="col-start-4 col-span-2 bg-primary rounded-md py-4 px-2">
                    {t('spider.content-6')}
                </div>
            </div>

            <div className="flex flex-col gap-12 items-center">
                <H2>{t('important.title')}</H2>
                <div className="rounded-md bg-secondary p-12 text-secondary-foreground font-extralight flex flex-col gap-4 mx-2 md:mx-12">
                    <RichText>{(tags) => t.rich('important.content', tags)}</RichText>
                </div>
            </div>

            <div className="flex flex-col gap-12 items-center">
                <H2>{t('for-you.title')}</H2>
                <div className="rounded-md bg-primary text-primary-foreground font-extralight grid grid-cols-3 mx-2 md:mx-12 overflow-hidden">
                    <Image
                        src="/IMG_2411.jpg"
                        className="h-full object-cover"
                        alt=""
                        width={2048}
                        height={1365}
                    />
                    <div className="p-12 col-span-2">
                        <H2>{t('for-you.list.title')}</H2>
                        <ul className="list-disc list-inside">
                            <li>{t('for-you.list.item-1')}</li>
                            <li>{t('for-you.list.item-2')}</li>
                            <li>{t('for-you.list.item-3')}</li>
                            <li>{t('for-you.list.item-4')}</li>
                            <li>{t('for-you.list.item-5')}</li>
                        </ul>
                    </div>
                </div>
                <Button variant="secondary" className="px-8 py-6">
                    <Link href="/agenda">{t('for-you.button')}</Link>
                </Button>
            </div>
        </div>
    );
}
