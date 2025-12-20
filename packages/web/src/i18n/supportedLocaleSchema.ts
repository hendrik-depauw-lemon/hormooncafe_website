import { z } from 'zod';

import { SupportedLocales } from '@/src/configs/i18n.config';

const supportedLocaleSchema = z.enum(
    Object.keys(SupportedLocales) as [
        keyof typeof SupportedLocales,
        ...Array<keyof typeof SupportedLocales>,
    ],
);
export default supportedLocaleSchema;
