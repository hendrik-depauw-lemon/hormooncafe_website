import { graphql } from '@/src/gql/generated';

export const getCalendarGroupsForComboBoxQuery = graphql(`
    query GetCalendarGroupsForComboBox($ids: [ID!]!) {
        ListCalendarGroupReadModels(filter: { id: { in: $ids } }, sortBy: { name: ASC }) {
            count
            items {
                id
                name
            }
        }
    }
`);
