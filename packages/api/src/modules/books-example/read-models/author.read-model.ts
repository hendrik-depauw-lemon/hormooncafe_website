import { Projects, ReadModel } from '@boostercloud/framework-core';
import { ProjectionResult, ReadModelAction } from '@boostercloud/framework-types';

import { BaseReadModel } from '../../../common/base-models';
import { Author } from '../entities/author.entity';

@ReadModel({ authorize: 'all' })
export class AuthorReadModel extends BaseReadModel<AuthorReadModel> {
    readonly name!: string;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;

    @Projects(Author, 'id')
    public static projectAuthor(entity: Author): ProjectionResult<AuthorReadModel> {
        if (entity.deletedAt) return ReadModelAction.Delete;

        return new AuthorReadModel({
            id: entity.id,
            name: entity.name,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        });
    }
}
