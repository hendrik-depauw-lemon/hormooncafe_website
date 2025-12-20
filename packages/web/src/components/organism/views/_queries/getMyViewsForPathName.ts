import { graphql } from '@/src/gql/generated';

export const getMyViewsForPathnameQuery = graphql(`
    query GetMyViewsForPathname($pathname: String!) {
        GetMyViewsForPathname(input: { pathname: $pathname }) {
            id
            name
            pathname
            searchParams
        }
    }
`);
