import { Booster, Query } from '@boostercloud/framework-core';
import { QueryInfo } from '@boostercloud/framework-types';

import { BaseQuery } from '../../../common/base-models';
import { CurrentUserValidators } from '../../../common/validators/current-user-validators';
import { ViewReadModel } from '../read-models/view.read-model';

@Query({ authorize: 'all' })
export class GetMyViewsForPathname extends BaseQuery<GetMyViewsForPathname> {
    readonly pathname!: string;

    public static async handle(
        query: GetMyViewsForPathname,
        queryInfo?: QueryInfo,
    ): Promise<ViewReadModel[]> {
        const userId = CurrentUserValidators.getUsername(queryInfo?.currentUser);

        return Booster.readModel(ViewReadModel)
            .filter({
                userId: { eq: userId },
                pathname: { eq: query.pathname },
            })
            .search();
    }
}
