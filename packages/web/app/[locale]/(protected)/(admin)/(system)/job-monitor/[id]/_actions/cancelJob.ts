import { graphql } from '@/src/gql/generated';

export const cancelJobMutation = graphql(`
    mutation CancelJob($input: CancelJobInput!) {
        CancelJob(input: $input)
    }
`);
