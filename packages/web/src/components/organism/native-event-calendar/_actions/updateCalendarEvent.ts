import { graphql } from '@/src/gql/generated';

export const updateCalendarEventMutation = graphql(`
    mutation UpdateCalendarEvent($input: UpdateCalendarEventInput!) {
        UpdateCalendarEvent(input: $input)
    }
`);
