import { ColumnFilter } from '@tanstack/react-table';
import { DateRange } from 'react-day-picker';

export type FilterModel<T = Record<string, unknown>> =
    | {
          key: keyof T;
          label: string;
          type:
              | FilterType.string
              | FilterType.number
              | FilterType.date
              | FilterType.boolean
              | FilterType.string_array;
      }
    | FilterModelWithEnum<T>;

export type FilterModelWithEnum<T = Record<string, unknown>> = {
    key: keyof T;
    label: string;
    type: FilterType.enum | FilterType.enum_array;
    enumValues: { value: string; label: string }[];
};

export enum FilterOperation {
    beginsWith = 'beginsWith',
    contains = 'contains',
    eq = 'eq',
    in = 'in',
    isEmpty = 'isEmpty',
    isNotEmpty = 'isNotEmpty',
    ne = 'ne',
    gt = 'gt',
    gte = 'gte',
    lt = 'lt',
    lte = 'lte',
    regex = 'regex',
    includes = 'includes',
    includesSome = 'includesSome',
    includesAll = 'includesAll',
    between = 'between',
}

export enum FilterType {
    string = 'string',
    number = 'number',
    date = 'date',
    boolean = 'boolean',
    enum = 'enum',
    string_array = 'string_array',
    enum_array = 'enum_array',
}

export const allowedOperations: Record<FilterType, FilterOperation[]> = {
    [FilterType.string]: [
        FilterOperation.contains,
        FilterOperation.beginsWith,
        FilterOperation.eq,
        FilterOperation.in,
        FilterOperation.isEmpty,
        FilterOperation.isNotEmpty,
        FilterOperation.ne,
        FilterOperation.regex,
    ],
    [FilterType.number]: [
        FilterOperation.eq,
        FilterOperation.in,
        FilterOperation.isEmpty,
        FilterOperation.isNotEmpty,
        FilterOperation.ne,
        FilterOperation.gt,
        FilterOperation.gte,
        FilterOperation.lt,
        FilterOperation.lte,
    ],
    [FilterType.date]: [
        FilterOperation.eq,
        FilterOperation.between,
        FilterOperation.isEmpty,
        FilterOperation.isNotEmpty,
        FilterOperation.ne,
        FilterOperation.gt,
        FilterOperation.gte,
        FilterOperation.lt,
        FilterOperation.lte,
    ],
    [FilterType.boolean]: [
        FilterOperation.eq,
        FilterOperation.isEmpty,
        FilterOperation.isNotEmpty,
        FilterOperation.ne,
    ],
    [FilterType.enum]: [
        FilterOperation.eq,
        FilterOperation.in,
        FilterOperation.isEmpty,
        FilterOperation.isNotEmpty,
        FilterOperation.ne,
    ],
    [FilterType.string_array]: [
        FilterOperation.includes,
        FilterOperation.includesSome,
        FilterOperation.includesAll,
        FilterOperation.isEmpty,
        FilterOperation.isNotEmpty,
    ],
    [FilterType.enum_array]: [
        FilterOperation.includes,
        FilterOperation.includesSome,
        FilterOperation.includesAll,
        FilterOperation.isEmpty,
        FilterOperation.isNotEmpty,
    ],
};

export type InternalFilterState = {
    key: string;
    operation: FilterOperation;
    type: FilterType;
    input?: unknown;
    inputDisplayValue?: string;
};

export type BoosterFilter = { and: Record<string, Record<string, unknown> | Array<unknown>>[] };

export function tanstackFilterToInternalFilterState(
    tanstackFilter: ColumnFilter[],
): InternalFilterState[] {
    return tanstackFilter.map((filter) => filter.value as InternalFilterState);
}

export function internalFilterStateToTanstackFilter(
    internalFilters: InternalFilterState[],
): ColumnFilter[] {
    return internalFilters.map((internalFilter) => ({
        id: Math.random().toString(), // Can have multiple filters with same key and operation
        value: internalFilter,
    }));
}

export function tanstackFilterToBoosterFilter(
    tanstackFilter: ColumnFilter[],
): BoosterFilter | undefined {
    const internalFilter = tanstackFilterToInternalFilterState(tanstackFilter);

    if (!internalFilter || internalFilter.length === 0) return undefined;

    const filter: BoosterFilter = { and: [] };

    for (const f of internalFilter) {
        const { key, operation, input, type } = f;

        if (operation === FilterOperation.isEmpty) {
            filter.and.push({ [key]: { isDefined: false } });
        } else if (operation === FilterOperation.isNotEmpty) {
            filter.and.push({ [key]: { isDefined: true } });
            continue;
        } else if (type === FilterType.enum && operation === FilterOperation.in) {
            if ((input as string[]).length === 0) continue;
            filter.and.push({ or: (input as string[]).map((v) => ({ [key]: { eq: v } })) });
        } else if (type === FilterType.date && operation === FilterOperation.between) {
            filter.and.push({
                and: [
                    { [key]: { gte: (input as DateRange)?.from } },
                    { [key]: { lte: (input as DateRange)?.to } },
                ],
            });
        } else if (operation === FilterOperation.includesSome) {
            if ((input as unknown[]).length === 0) continue;
            filter.and.push({ or: (input as unknown[]).map((v) => ({ [key]: { includes: v } })) });
        } else if (operation === FilterOperation.includesAll) {
            if ((input as unknown[]).length === 0) continue;
            filter.and.push({ and: (input as unknown[]).map((v) => ({ [key]: { includes: v } })) });
        } else {
            filter.and.push({ [key]: { [operation]: input } } as Record<
                string,
                Record<FilterOperation, unknown>
            >);
        }
    }

    return filter;
}
