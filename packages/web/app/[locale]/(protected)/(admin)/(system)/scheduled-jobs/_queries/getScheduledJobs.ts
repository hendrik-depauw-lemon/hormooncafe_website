import { graphql } from '@/src/gql/generated';

export const getScheduledJobsQuery = graphql(`
    query ListScheduledJobReadModels(
        $limit: Int
        $skip: Int
        $filter: ListScheduledJobReadModelFilter
        $sort: ScheduledJobReadModelSortBy
    ) {
        ListScheduledJobReadModels(
            limit: $limit
            afterCursor: { skip: $skip }
            filter: $filter
            sortBy: $sort
        ) {
            count
            items {
                id
                name
                schedule
                jobKey
                active
            }
        }
    }
`);
