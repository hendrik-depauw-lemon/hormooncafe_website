import { graphql } from '@/src/gql/generated';

export const getJobExecutionsStatusSubscription = graphql(`
    subscription JobExecutionStatusSubscription($filter: JobExecutionReadModelSubscriptionFilter) {
        JobExecutionReadModels(filter: $filter) {
            id
            status
        }
    }
`);
