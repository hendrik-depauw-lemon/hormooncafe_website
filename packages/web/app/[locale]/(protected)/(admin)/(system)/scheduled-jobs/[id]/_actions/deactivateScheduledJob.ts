import { graphql } from '@/src/gql/generated';

export const deactivateScheduledJobMutation = graphql(`
    mutation DeactivateScheduledJob($input: DeactivateScheduledJobInput!) {
        DeactivateScheduledJob(input: $input)
    }
`);
