import { graphql } from '@/src/gql/generated';

export const getJobExecutionsQuery = graphql(`
    query ListJobExecutionReadModels(
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
                name
                startedAt
                completedAt
                status
                totalItems
                successfulItems
                failedItems
                summary
                durationInSeconds
                progress
                jobKey
                scheduledJobId
                createdAt
                updatedAt
            }
        }
    }
`);
