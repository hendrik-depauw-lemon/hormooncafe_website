import { NextMiddlewareResult } from 'next/dist/server/web/types';
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server';

import { MiddlewarePlugin } from '@/src/types/middleware/plugin';

export const plugin: MiddlewarePlugin =
    (next: NextMiddleware): NextMiddleware =>
    async (request: NextRequest, event: NextFetchEvent): Promise<NextMiddlewareResult> => {
        if (request.nextUrl.pathname.startsWith('/api/')) return await next(request, event);

        const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
        const cspHeader = `
            default-src 'self';
            script-src 'nonce-${nonce}' 'strict-dynamic' ${
                process.env.NODE_ENV === 'development' ? `'unsafe-eval'` : ''
            };
            style-src 'self' 'nonce-${nonce}';
            img-src 'self' ${process.env.NEXT_PUBLIC_STRAPI_URL}/  ${
                process.env.NEXT_PUBLIC_CDN_URL
            }/ blob: data:;
            font-src 'self';
            frame-src 'self';
            connect-src 'self' ${process.env.NEXT_PUBLIC_API_URL} ${process.env.NEXT_PUBLIC_SUBSCRIPTION_API_URL};
            object-src 'none';
            base-uri 'self';
            form-action 'self';
            frame-ancestors 'none';
            report-to csp-endpoint;
        `;

        // Replace newline characters and spaces
        const contentSecurityPolicyHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim();

        request.headers.set('x-nonce', nonce);
        request.headers.set(
            'Content-Security-Policy-Report-Only',
            contentSecurityPolicyHeaderValue,
        );
        const response = await next(request, event);
        if (!response) return new NextResponse('Internal Server Error', { status: 500 });
        response.headers.set(
            'Content-Security-Policy-Report-Only',
            contentSecurityPolicyHeaderValue,
        );
        response.headers.set(
            'Reporting-Endpoints',
            `csp-endpoint=${process.env.NEXT_PUBLIC_CSP_REPORTS}`,
        );
        return response;
    };
