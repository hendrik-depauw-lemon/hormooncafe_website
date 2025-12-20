import { NextResponse } from 'next/server';

import { MiddlewarePlugin } from '@/src/types/middleware/plugin';

const plugin: MiddlewarePlugin = () => async () => NextResponse.next();
export default plugin;
