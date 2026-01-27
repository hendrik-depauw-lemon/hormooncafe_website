'use client';

import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { H1 } from '../../../../src/components/atoms/typography/H1';
import { Lead } from '../../../../src/components/atoms/typography/Lead';
import { Link } from '../../../../src/i18n/navigation';
import { Button } from '../../../../src/shadcn/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselOptions,
} from '../../../../src/shadcn/components/ui/carousel';

export function HeroSection() {
    const t = useTranslations('hero-section');

    const carouselOptions: CarouselOptions = {
        loop: true,
    };
    const carouselPlugins = [Autoplay({ playOnInit: true, delay: 5000 })];

    return (
        <Carousel className="h-full w-full" opts={carouselOptions} plugins={carouselPlugins}>
            <CarouselContent className="ml-0">
                {['/IMG_2411.jpg', '/IMG_2568.jpg', '/IMG_2339.jpg'].map((src, index) => (
                    <CarouselItem key={index} className="h-screen w-screen pl-0">
                        <Image
                            src={src}
                            className="h-full object-cover"
                            alt=""
                            width={2048}
                            height={1365}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="absolute top-0 flex flex-col items-center w-full gap-16 p-12 text-center">
                <H1 className="text-primary-foreground">{t('title')}</H1>
                <Lead className="font-special font-bold">{t('subtitle')}</Lead>
                <Button asChild>
                    <Link href="/workshops">{t('cta-button')}</Link>
                </Button>
                <div className="mt-48">
                    <Lead className="bg-primary py-2 px-4 rounded-md font-special font-bold">
                        {t('footer')}
                    </Lead>
                </div>
            </div>
        </Carousel>
    );
}
