import { graphql } from '@/src/gql/generated';

export const activateScheduledJobMutation = graphql(`
    mutation ActivateScheduledJob($input: ActivateScheduledJobInput!) {
        ActivateScheduledJob(input: $input)
    }
`);
