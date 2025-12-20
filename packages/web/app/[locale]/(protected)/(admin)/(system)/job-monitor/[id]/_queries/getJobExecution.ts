import { graphql } from '@/src/gql/generated';

export const getJobExecutionQuery = graphql(`
    query JobExecutionReadModel($id: ID!) {
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
            estimatedSecondsRemaining
            progress
            messages {
                message
                timestamp
            }
            jobKey
            scheduledJobId
            data
            createdAt
            updatedAt
        }
    }
`);
