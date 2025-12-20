import { graphql } from '@/src/gql/generated';

export const getAvailableCalendarGroupsQuery = graphql(`
    query GetAvailableCalendarGroups($searchTerm: String!) {
        ListCalendarGroupReadModels(
            limit: 20
            filter: { or: [{ name: { contains: $searchTerm } }] }
            sortBy: { name: ASC }
        ) {
            items {
                id
                name
            }
            count
        }
    }
`);
