import { NextMiddleware } from 'next/server';

import { MiddlewarePlugin } from '@/src/types/middleware/plugin';

import { pluginCSP as csp, pluginI18N as i18n } from './plugins';
import { default as pluginStack } from './stack';

const middleware: NextMiddleware = async (request, event) => {
    const plugins: MiddlewarePlugin[] = [csp, i18n];
    const stack = await pluginStack({ event, plugins, request });
    return await stack(request, event);
};
export default middleware;
