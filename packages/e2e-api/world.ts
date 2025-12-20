import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import {
    After,
    IWorldOptions,
    setWorldConstructor,
    World,
    world as cucumberWorld,
} from '@cucumber/cucumber';
import { OperationResult } from '@urql/core';

import { AddExampleMutation, ListExample2ReadModelsQuery } from './gql/graphql';

const todaySharedDate = new Date();

const derefFunction = (key: string) => {
    if (key.startsWith('*')) {
        const trimmedKey = key.slice(1);
        const dereferenced = cucumberWorld.parameters.itemMap.get(trimmedKey);
        if (!dereferenced) return trimmedKey;
        return dereferenced;
    } else if (key === 'todaySharedDate') {
        return todaySharedDate.toISOString();
    }
    return key;
};

function getDefaultWorldParameters() {
    return {
        todaySharedDate: todaySharedDate,
        accessToken: 'unset',
        itemMap: new Map(),
        getDereferencedItem: derefFunction,
        dereferenceAllInString: (str: string) => {
            return str.replace(/\*[^"]+/g, (match) => {
                return derefFunction(match);
            });
        },
    };
}

function createMyWorld(
    this: World & { foo: string },
    props: IWorldOptions & { itemMap: Map<string, string> },
) {
    Object.assign(this, props, {
        parameters: {
            ...props.parameters,
            ...getDefaultWorldParameters(),
        },
    });
}

setWorldConstructor(createMyWorld);

After(async function (scenario) {
    console.log(`Scenario '${scenario.pickle.name}' finished.`);
});

const world = cucumberWorld as World<{
    todaySharedDate: Date;
    accessToken: string;
    itemMap: Map<string, string>;
    getDereferencedItem: (key: string) => string;
    dereferenceAllInString: (str: string) => string;

    AddExample?: OperationResult<AddExampleMutation>;
    ListExampleReadModels?: OperationResult<ListExample2ReadModelsQuery>;
}>;

export { world };
