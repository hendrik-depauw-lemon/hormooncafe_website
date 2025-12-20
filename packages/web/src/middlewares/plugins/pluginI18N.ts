import { NextMiddlewareResult } from 'next/dist/server/web/types';
import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import config from '@/src/configs/i18n.config';
import { MiddlewarePlugin } from '@/src/types/middleware/plugin';

export const plugin: MiddlewarePlugin =
    (next: NextMiddleware) =>
    async (request: NextRequest, event: NextFetchEvent): Promise<NextMiddlewareResult> => {
        if (request.nextUrl.pathname.startsWith('/api/')) return await next(request, event);

        await next(request, event);
        return createMiddleware({
            ...config,
            localePrefix: 'always',
        })(request);
    };
