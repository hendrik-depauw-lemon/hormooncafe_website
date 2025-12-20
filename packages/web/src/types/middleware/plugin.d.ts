import { NextMiddleware } from 'next/server';

export type MiddlewarePlugin = (next: NextMiddleware) => NextMiddleware;
