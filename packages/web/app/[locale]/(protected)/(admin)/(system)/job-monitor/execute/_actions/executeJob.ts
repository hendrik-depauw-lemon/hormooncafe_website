import { graphql } from '@/src/gql/generated';

export const executeJobMutation = graphql(`
    mutation ExecuteJob($input: ExecuteJobInput!) {
        ExecuteJob(input: $input)
    }
`);
