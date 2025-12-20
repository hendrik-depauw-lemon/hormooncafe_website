import { graphql } from '@/src/gql/generated';

export const deleteRecurringCalendarEventInstanceMutation = graphql(`
    mutation DeleteRecurringCalendarEventInstance(
        $input: DeleteRecurringCalendarEventInstanceInput!
    ) {
        DeleteRecurringCalendarEventInstance(input: $input)
    }
`);
