import { graphql } from '@/src/gql/generated';

export const createScheduledJobMutation = graphql(`
    mutation CreateScheduledJob($input: CreateScheduledJobInput!) {
        CreateScheduledJob(input: $input)
    }
`);
