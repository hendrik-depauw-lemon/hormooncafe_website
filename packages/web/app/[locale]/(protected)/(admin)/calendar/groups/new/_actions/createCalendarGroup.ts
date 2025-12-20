import { graphql } from '@/src/gql/generated';

export const createCalendarGroupMutation = graphql(`
    mutation CreateCalendarGroup($input: CreateCalendarGroupInput!) {
        CreateCalendarGroup(input: $input)
    }
`);
