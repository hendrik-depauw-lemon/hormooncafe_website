import { Entity, Reduces } from '@boostercloud/framework-core';

import { BaseEntity } from '../../../common/base-models';
import { AuthorAdded } from '../events/author-added.event';
import { AuthorChanged } from '../events/author-changed.event';
import { AuthorRemoved } from '../events/author-removed.event';

@Entity
export class Author extends BaseEntity<Author> {
    readonly name!: string;

    @Reduces(AuthorAdded)
    public static reduceAuthorAdded(event: AuthorAdded): Author {
        return new Author({
            id: event.id,
            createdAt: event.eventTime,
            updatedAt: event.eventTime,
            name: event.name,
        });
    }

    @Reduces(AuthorChanged)
    public static reduceAuthorChanged(event: AuthorChanged, currentAuthor: Author): Author {
        return new Author({
            ...currentAuthor,
            name: event.name,
            updatedAt: event.eventTime,
        });
    }

    @Reduces(AuthorRemoved)
    public static reduceAuthorRemoved(event: AuthorRemoved, currentAuthor: Author): Author {
        return new Author({
            ...currentAuthor,
            deletedAt: event.eventTime,
        });
    }
}
