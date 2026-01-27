import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { H2 } from '../../../../src/components/atoms/typography/H2';
import { Link } from '../../../../src/i18n/navigation';
import { Button } from '../../../../src/shadcn/components/ui/button';

export function WhatIsSection() {
    const t = useTranslations('what-is-section');

    return (
        <div className="flex flex-col gap-12 items-center xl:mx-48">
            <H2 className="text-primary">{t('title')}</H2>

            <div className="self-end rounded-l-md bg-secondary text-secondary-foreground max-w-11/12 lg:max-w-10/12 flex flex-row">
                <div className="p-6 lg:p-12 basis-2/3 flex flex-col gap-4">
                    <p className="text-sm">{t('card-1.content-1')}</p>
                    <p className="text-sm">{t('card-1.content-2')}</p>
                    <Button asChild>
                        <Link href="/workshops">{t('card-1.button')}</Link>
                    </Button>
                </div>
                <div className="basis-1/3">
                    <Image
                        src="/IMG_2568.jpg"
                        className="h-full object-cover"
                        alt=""
                        width={2048}
                        height={1365}
                    />
                </div>
            </div>

            <div className="self-start rounded-r-md bg-primary max-w-11/12 lg:max-w-10/12 flex flex-row">
                <div className="basis-1/3">
                    <Image
                        src="/IMG_2411.jpg"
                        className="h-full object-cover"
                        alt=""
                        width={2048}
                        height={1365}
                    />
                </div>
                <div className="p-6 lg:p-12 basis-2/3 flex flex-col gap-4">
                    <H2 className="text-secondary">{t('card-2.title')}</H2>
                    <ul className="text-sm text-secondary-foreground list-disc list-inside">
                        <li>{t('card-2.list.item-1')}</li>
                        <li>{t('card-2.list.item-2')}</li>
                        <li>{t('card-2.list.item-3')}</li>
                        <li>{t('card-2.list.item-4')}</li>
                        <li>{t('card-2.list.item-5')}</li>
                    </ul>
                    <Button asChild variant="secondary">
                        <Link href="/agenda">{t('card-2.button')}</Link>
                    </Button>
                </div>
            </div>

            <div className="self-end rounded-l-md bg-secondary text-secondary-foreground max-w-11/12 lg:max-w-10/12 flex flex-row md:max-h-72">
                <div className="p-6 lg:p-12 basis-2/3 flex flex-col gap-4">
                    <H2 className="text-primary">{t('card-3.title')}</H2>
                    <p className="text-sm font-bold">{t('card-3.content-1')}</p>
                    <p className="text-sm">{t('card-3.content-2')}</p>
                    <Button>{t('card-3.button')}</Button>
                </div>
                <div className="basis-1/3">
                    <Image
                        src="/IMG_2524.jpg"
                        className="h-full object-cover"
                        alt=""
                        width={2048}
                        height={1365}
                    />
                </div>
            </div>
        </div>
    );
}
