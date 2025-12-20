import { graphql } from '@/src/gql/generated';

export const updateCalendarGroupMutation = graphql(`
    mutation UpdateCalendarGroup($input: UpdateCalendarGroupInput!) {
        UpdateCalendarGroup(input: $input)
    }
`);
