import { graphql } from '@/src/gql/generated';

export const createCalendarEventMutation = graphql(`
    mutation CreateCalendarEvent($input: CreateCalendarEventInput!) {
        CreateCalendarEvent(input: $input)
    }
`);
