import { graphql } from '@/src/gql/generated';

export const deleteCalendarGroupMutation = graphql(`
    mutation DeleteCalendarGroup($input: DeleteCalendarGroupInput!) {
        DeleteCalendarGroup(input: $input)
    }
`);
