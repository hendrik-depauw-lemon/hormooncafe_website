import { z } from 'zod';

export function requiredEnvironmentVariable(name: string): string {
    return z
        .string({ required_error: `Missing environment variable ${name}` })
        .parse(process.env[name]);
}
