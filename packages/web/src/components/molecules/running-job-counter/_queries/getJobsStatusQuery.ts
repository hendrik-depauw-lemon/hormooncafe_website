import { graphql } from '@/src/gql/generated';

export const getJobsStatusQuery = graphql(`
    query ListJobExecutionStatus(
        $limit: Int
        $skip: Int
        $filter: ListJobExecutionReadModelFilter
        $sort: JobExecutionReadModelSortBy
    ) {
        ListJobExecutionReadModels(
            limit: $limit
            afterCursor: { skip: $skip }
            filter: $filter
            sortBy: $sort
        ) {
            count
            items {
                id
                status
            }
        }
    }
`);
