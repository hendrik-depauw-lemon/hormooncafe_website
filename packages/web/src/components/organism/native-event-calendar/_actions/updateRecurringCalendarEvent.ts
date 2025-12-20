import { graphql } from '@/src/gql/generated';

export const updateRecurringCalendarEventMutation = graphql(`
    mutation UpdateRecurringCalendarEvent($input: UpdateRecurringCalendarEventInput!) {
        UpdateRecurringCalendarEvent(input: $input)
    }
`);
