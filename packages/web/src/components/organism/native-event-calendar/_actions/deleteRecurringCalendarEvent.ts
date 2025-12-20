import { graphql } from '@/src/gql/generated';

export const deleteRecurringCalendarEventMutation = graphql(`
    mutation DeleteRecurringCalendarEvent($input: DeleteRecurringCalendarEventInput!) {
        DeleteRecurringCalendarEvent(input: $input)
    }
`);
