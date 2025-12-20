import { graphql } from '@/src/gql/generated';

export const getCalendarGroupsQuery = graphql(`
    query GetCalendarGroups(
        $limit: Int
        $skip: Int
        $filter: ListCalendarGroupReadModelFilter
        $sort: CalendarGroupReadModelSortBy
    ) {
        ListCalendarGroupReadModels(
            limit: $limit
            afterCursor: { skip: $skip }
            filter: $filter
            sortBy: $sort
        ) {
            count
            items {
                id
                name
                color
            }
        }
    }
`);
