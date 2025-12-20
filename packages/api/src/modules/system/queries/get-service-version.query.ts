import { Query } from '@boostercloud/framework-core';
import * as fsPromises from 'fs/promises';
import { join } from 'path';

import { BaseQuery, BaseValueObject } from '../../../common/base-models';

class ServiceVersionInfo extends BaseValueObject<ServiceVersionInfo> {
    readonly version!: string;
}

@Query({ authorize: 'all' })
export class GetServiceVersion extends BaseQuery<GetServiceVersion> {
    public static async handle(_: GetServiceVersion): Promise<ServiceVersionInfo> {
        try {
            const packageJsonPath = join(__dirname, '..', '..', '..', '..', 'package.json');
            const packageJsonContent = await fsPromises.readFile(packageJsonPath, 'utf8');
            const { version } = JSON.parse(packageJsonContent);

            return { version };
        } catch (error) {
            return {
                version: 'unknown',
            };
        }
    }
}
