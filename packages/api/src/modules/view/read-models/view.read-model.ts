import { Projects, ReadModel } from '@boostercloud/framework-core';
import { ProjectionResult, ReadModelAction } from '@boostercloud/framework-types';

import { BaseReadModel } from '../../../common/base-models';
import { View } from '../entities/view.entity';

@ReadModel({ authorize: [] })
export class ViewReadModel extends BaseReadModel<ViewReadModel> {
    readonly userId!: string;
    readonly name!: string;
    readonly pathname!: string;
    readonly searchParams!: string;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;

    @Projects(View, 'id')
    public static projectView(entity: View): ProjectionResult<ViewReadModel> {
        if (entity.deletedAt) return ReadModelAction.Delete;

        return new ViewReadModel({
            id: entity.id,
            userId: entity.userId,
            name: entity.name,
            pathname: entity.pathname,
            searchParams: entity.searchParams,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        });
    }
}
