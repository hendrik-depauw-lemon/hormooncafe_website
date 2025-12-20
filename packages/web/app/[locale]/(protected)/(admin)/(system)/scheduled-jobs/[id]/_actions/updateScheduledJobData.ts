import { graphql } from '@/src/gql/generated';

export const updateScheduledJobDataMutation = graphql(`
    mutation UpdateScheduledJobData($input: UpdateScheduledJobDataInput!) {
        UpdateScheduledJobData(input: $input)
    }
`);
