import { serializeBase64 } from '../../../../utils/nuqs/parseBase64';

export function createDefaultValuesSearchParam(value: Record<string, unknown>): URLSearchParams {
    return new URLSearchParams({
        defaultValues: serializeBase64(value),
    });
}
