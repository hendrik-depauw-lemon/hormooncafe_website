import { createParser, ParserBuilder } from 'nuqs';
import z from 'zod';

export function serializeBase64(value: Record<string, unknown>): string {
    const stringifiedValue = JSON.stringify(value);
    const encoded = btoa(stringifiedValue);
    return encoded;
}

export function parseBase64<T extends z.ZodType>(schema: T): ParserBuilder<z.infer<T>> {
    return createParser({
        parse: (query): z.infer<T> => {
            const decoded = atob(query);
            const jsonParsed = JSON.parse(decoded);
            const parsed = schema.safeParse(jsonParsed);
            if (!parsed.success)
                console.error('Failed to parse base64 query param', {
                    query,
                    decoded,
                    error: parsed.error,
                });
            return parsed.data;
        },
        serialize: (value): string => serializeBase64(value),
        eq: (a, b) => a === b || JSON.stringify(a) === JSON.stringify(b),
    });
}
