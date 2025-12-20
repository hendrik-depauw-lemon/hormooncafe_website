import { Command } from '@boostercloud/framework-core';
import { Register, UUID } from '@boostercloud/framework-types';
import { z } from 'zod';

import { BaseCommand } from '../../../common/base-models';
import { NonEmpty } from '../../../common/validation-decorators/non-empty.decorator';
import { ZodValidate } from '../../../common/validation-decorators/zod-validate.decorator';
import { BookChanged } from '../events/book-changed.event';
import { BookCoverType } from '../models/book-cover-type.model';

@Command({ authorize: 'all' })
export class ChangeBook extends BaseCommand<ChangeBook> {
    readonly id!: UUID;

    @NonEmpty()
    @ZodValidate(z.string().max(80))
    readonly title!: string;

    @ZodValidate(z.string().max(100).optional())
    readonly description?: string;

    readonly publishDate!: Date;
    readonly numberOfPages!: number;
    readonly availableAsEbook!: boolean;
    readonly coverType!: BookCoverType;

    readonly authorIds?: UUID[];
    readonly publisherId!: UUID;

    public static async handle(command: ChangeBook, register: Register): Promise<UUID> {
        register.events(
            new BookChanged({
                id: command.id,
                title: command.title,
                description: command.description,
                publishDate: command.publishDate,
                numberOfPages: command.numberOfPages,
                availableAsEbook: command.availableAsEbook,
                coverType: command.coverType,
                authorIds: command.authorIds,
                publisherId: command.publisherId,
            }),
        );

        return command.id;
    }
}
