import { Booster, Query } from '@boostercloud/framework-core';

import { BaseQuery } from '../../../common/base-models';
import { Admin } from '../../../config/roles';
import { BookReadModel } from '../read-models/book.read-model';

@Query({ authorize: [Admin] })
export class GetRandomBook extends BaseQuery<GetRandomBook> {
    public static async handle(): Promise<BookReadModel | undefined> {
        const examples = await Booster.readModel(BookReadModel).search();
        if (examples.length === 0) return undefined;
        const randomIndex = Math.floor(Math.random() * examples.length);
        return examples[randomIndex];
    }
}
