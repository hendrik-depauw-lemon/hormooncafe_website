import { Event } from '@boostercloud/framework-core';
import { UUID } from '@boostercloud/framework-types';

import { BaseEvent } from '../../../common/base-models';
import { BookCoverType } from '../models/book-cover-type.model';

@Event
export class BookAdded extends BaseEvent<BookAdded> {
    readonly id!: UUID;
    readonly title!: string;
    readonly description?: string;
    readonly publishDate!: Date;
    readonly numberOfPages!: number;
    readonly availableAsEbook!: boolean;
    readonly coverType!: BookCoverType;
    readonly authorIds?: UUID[];
    readonly publisherId!: UUID;

    public entityID(): UUID {
        return this.id;
    }
}
