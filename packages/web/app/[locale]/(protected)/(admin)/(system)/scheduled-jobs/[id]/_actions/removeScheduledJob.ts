import { graphql } from '@/src/gql/generated';

export const removeScheduledJobMutation = graphql(`
    mutation RemoveScheduledJob($input: RemoveScheduledJobInput!) {
        RemoveScheduledJob(input: $input)
    }
`);
