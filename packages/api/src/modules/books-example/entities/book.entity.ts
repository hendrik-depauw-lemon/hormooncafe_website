import { Entity, Reduces } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEntity } from '../../../common/base-models';
import { BookAdded } from '../events/book-added.event';
import { BookChanged } from '../events/book-changed.event';
import { BookRemoved } from '../events/book-removed.event';
import { BookCoverType } from '../models/book-cover-type.model';

@Entity
export class Book extends BaseEntity<Book> {
    //readonly id!: UUID; already exists in BaseEntity
    readonly title!: string;
    readonly description?: string;
    readonly publishDate!: Date;
    readonly numberOfPages!: number;
    readonly availableAsEbook!: boolean;
    readonly coverType!: BookCoverType;
    readonly authorIds?: UUID[];
    readonly publisherId!: UUID;

    @Reduces(BookAdded)
    public static reduceBookAdded(event: BookAdded): Book {
        return new Book({
            id: event.id,
            createdAt: event.eventTime,
            updatedAt: event.eventTime,
            title: event.title,
            description: event.description,
            publishDate: event.publishDate,
            numberOfPages: event.numberOfPages,
            availableAsEbook: event.availableAsEbook,
            coverType: event.coverType,
            authorIds: event.authorIds,
            publisherId: event.publisherId,
        });
    }

    @Reduces(BookChanged)
    public static reduceBookChanged(event: BookChanged, currentBook: Book): Book {
        return new Book({
            ...currentBook,
            title: event.title,
            description: event.description,
            publishDate: event.publishDate,
            numberOfPages: event.numberOfPages,
            availableAsEbook: event.availableAsEbook,
            coverType: event.coverType,
            updatedAt: event.eventTime,
            authorIds: event.authorIds,
            publisherId: event.publisherId,
        });
    }

    @Reduces(BookRemoved)
    public static reduceBookRemoved(event: BookRemoved, currentBook: Book): Book {
        return new Book({
            ...currentBook,
            deletedAt: event.eventTime,
        });
    }
}
