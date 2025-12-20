/* eslint-disable @typescript-eslint/no-explicit-any */
import * as _ from 'lodash';

import { world } from '../world';

export function findObject(
    items: Record<string, any>[] | undefined,
    objectToFind: Record<string, any>,
): Record<string, any> | undefined {
    if (!items) return undefined;
    for (const item of items) {
        const objString = JSON.stringify(objectToFind);
        const objStringDerefIds = world.parameters.dereferenceAllInString(objString);
        const objStringParsedNull = objStringDerefIds.replace(/"null"/g, 'null');
        const parsedObject = JSON.parse(objStringParsedNull);
        const matches = _.matches(parsedObject)(item);
        if (matches) return item;
    }
    return undefined;
}

export function findObjectOrThrow(
    items: Record<string, any>[] | undefined,
    objectToFind: Record<string, any>,
): void {
    if (!items) throw new Error('No items to search');
    const obj = findObject(items, objectToFind);
    if (!obj) {
        throw new Error(
            `Could not find: ${JSON.stringify(objectToFind, null, 2)}\nLast object was: ${JSON.stringify(items[items.length - 1], null, 2)}`,
        );
    }
}
