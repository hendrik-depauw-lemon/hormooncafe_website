import { graphql } from '@/src/gql/generated/gql';

export const getJobExecutionSubscription = graphql(`
    subscription JobExecutionReadModelSubscription($id: ID!) {
        JobExecutionReadModel(id: $id) {
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
            messages {
                message
                timestamp
            }
            createdAt
            updatedAt
        }
    }
`);
