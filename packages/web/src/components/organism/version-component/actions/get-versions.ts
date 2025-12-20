import { graphql } from '@/src/gql/generated';

import { getClient } from '../../../../utils/urql/getURQLClient';

export function getWebAppVersion(): string {
    if (!process.env.WEB_APP_VERSION) {
        return 'unknown';
    }
    return `v${process.env.WEB_APP_VERSION}`;
}

const getServiceVersionQuery = graphql(`
    query getServiceVersion {
        GetServiceVersion {
            version
        }
    }
`);

export async function getAPIVersion(): Promise<string> {
    const response = await getClient().query(getServiceVersionQuery, {});
    const version = response.data?.GetServiceVersion?.version;
    if (!version) return 'unknown';
    return `v${version}`;
}
