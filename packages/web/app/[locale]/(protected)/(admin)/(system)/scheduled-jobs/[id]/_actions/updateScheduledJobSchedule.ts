import { graphql } from '@/src/gql/generated';

export const updateScheduledJobScheduleMutation = graphql(`
    mutation UpdateScheduledJobSchedule($input: UpdateScheduledJobScheduleInput!) {
        UpdateScheduledJobSchedule(input: $input)
    }
`);
