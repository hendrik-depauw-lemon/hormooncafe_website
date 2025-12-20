import { Projects, ReadModel } from '@boostercloud/framework-core';
import { ProjectionResult, ReadModelAction, UUID } from '@boostercloud/framework-types';

import { BaseReadModel, BaseValueObject } from '../../../common/base-models';
import { chainProjections, projectLinkedEntity } from '../../../common/linked-read-models';
import { ProjectsLinkedEntity } from '../../../decorators/projects-linked-entity.decorator';
import { Author } from '../entities/author.entity';
import { Book } from '../entities/book.entity';
import { Publisher } from '../entities/publisher.entity';
import { BookCoverType } from '../models/book-cover-type.model';

class NestedObject extends BaseValueObject<NestedObject> {
    readonly title!: string;

    constructor(init: Omit<NestedObject, 'randomNumber'>) {
        super(init as NestedObject);
    }

    public get randomNumber(): number {
        return Math.random();
    }
}

@ReadModel({ authorize: 'all' })
export class BookReadModel extends BaseReadModel<BookReadModel> {
    readonly title!: string;
    readonly description?: string;
    readonly publishDate!: Date;
    readonly numberOfPages!: number;
    readonly availableAsEbook!: boolean;
    readonly coverType!: BookCoverType;
    readonly authorIds?: UUID[];
    readonly authorNames?: string[];
    readonly publisherId!: UUID;
    readonly publisherName!: string;
    readonly createdAt!: Date;
    readonly updatedAt!: Date;

    readonly nested!: NestedObject;
    readonly nestedList!: NestedObject[];

    constructor(init: Omit<BookReadModel, 'test'>) {
        super(init as BookReadModel);
        if (!init) return; // Booster creates instances without passing arguments
        this.nested = new NestedObject(init.nested);
        this.nestedList = init.nestedList.map((nested) => new NestedObject(nested));
    }

    @Projects(Book, 'id')
    public static async projectBook(
        entity: Book,
        current?: BookReadModel,
    ): Promise<ProjectionResult<BookReadModel>> {
        if (entity.deletedAt) return ReadModelAction.Delete;

        return chainProjections(
            new BookReadModel({
                id: entity.id,
                title: entity.title,
                description: entity.description,
                publishDate: entity.publishDate,
                numberOfPages: entity.numberOfPages,
                availableAsEbook: entity.availableAsEbook,
                coverType: entity.coverType,
                authorIds: entity.authorIds,
                authorNames: current?.authorNames,
                publisherId: entity.publisherId,
                publisherName: '',
                createdAt: entity.createdAt,
                updatedAt: entity.updatedAt,
                nested: new NestedObject({ title: entity.title }),
                nestedList: [new NestedObject({ title: entity.title })],
            }),
            ...(entity.authorIds || []).map((authorId, index) =>
                projectLinkedEntity({
                    entityClass: Author,
                    entityId: authorId,
                    oldEntityId: current?.authorIds?.[index],
                    projectionFunction: BookReadModel.projectAuthor,
                }),
            ),
            projectLinkedEntity({
                entityClass: Publisher,
                entityId: entity.publisherId,
                oldEntityId: current?.publisherId,
                projectionFunction: BookReadModel.projectPublisher,
            }),
        );
    }

    @ProjectsLinkedEntity(Author, BookReadModel, (author) => ({
        authorIds: { includes: author.id },
    }))
    public static projectAuthor(entity?: Author, readModelId?: UUID, readModel?: BookReadModel) {
        if (!readModel) return ReadModelAction.Nothing;

        if (!entity || entity.deletedAt)
            return new BookReadModel({
                ...readModel,
                authorNames: readModel.authorNames?.filter((name) => name !== entity?.name),
            });

        return new BookReadModel({
            ...readModel,
            authorNames: [...(readModel.authorNames || []), entity.name],
        });
    }

    @ProjectsLinkedEntity(Publisher, BookReadModel, (publisher) => ({
        publisherId: { eq: publisher.id },
    }))
    public static projectPublisher(
        entity?: Publisher,
        readModelId?: UUID,
        readModel?: BookReadModel,
    ) {
        if (!readModel) return ReadModelAction.Nothing;

        if (!entity || entity.deletedAt) throw new Error();

        return new BookReadModel({
            ...readModel,
            publisherName: entity.name,
        });
    }
}
