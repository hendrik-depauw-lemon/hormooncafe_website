import { Booster } from '@boostercloud/framework-core';
import { ReadModelInterface } from '@boostercloud/framework-types';

export function Indexed(indexConfig: { name: string; order: number }) {
    return (target: ReadModelInterface, propertyName: string): void => {
        const readModelName = target.constructor.name;
        Booster.configureCurrentEnv((config) => {
            config.readModelIndexes ??= {};
            config.readModelIndexes[readModelName] ??= {};
            config.readModelIndexes[readModelName][indexConfig.name] ??= {};
            config.readModelIndexes[readModelName][indexConfig.name][propertyName] =
                indexConfig.order;
        });
    };
}
