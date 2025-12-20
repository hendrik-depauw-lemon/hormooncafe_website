import {
    BooleanPropertyFilter,
    DatePropertyFilter,
    InputMaybe,
    OrderProperty,
    StringPropertyFilter,
    UuidPropertyFilter,
} from '@/src/gql/generated/graphql';

export type SupportedFilterType =
    | StringPropertyFilter
    | DatePropertyFilter
    | BooleanPropertyFilter
    | UuidPropertyFilter;

export type TBaseFilter = Record<
    Omit<keyof TData, '__typename'>,
    InputMaybe<SupportedFilterType> | undefined
>;
export type SSRPaginatedQuery<TData, TFilter extends TBaseFilter = TBaseFilter> = (vars: {
    limit: number;
    skip: number;
    sort: Record<keyof TData, OrderProperty>;
    filter: TFilter;
}) => Promise<
    | {
          items: TData[];
          count: number;
      }
    | undefined
>;

export type { SSRPaginatedQuery };
