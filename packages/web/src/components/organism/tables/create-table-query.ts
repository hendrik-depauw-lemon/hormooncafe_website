import { AnyVariables, DocumentInput, OperationContext } from 'urql';

import { getClient } from '../../../utils/urql/getURQLClient';

export function createTableQuery<Data, Variables extends AnyVariables = AnyVariables>(
    query: DocumentInput<Data, Variables>,
    key: keyof Omit<Data, '__typename'>,
) {
    return async (variables: Variables, context?: Partial<OperationContext>) => {
        const result = await getClient().query(query, variables, context);
        return result.data?.[key];
    };
}
