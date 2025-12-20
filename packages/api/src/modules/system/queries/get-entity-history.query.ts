import { Booster, Query } from '@boostercloud/framework-core';
import { Register } from '@boostercloud/framework-types';
import { Provider } from '@lemoncompanies/booster-framework-provider-micro';
import { chain, keyBy } from 'lodash';

import { BaseQuery, BaseValueObject } from '../../../common/base-models';
import { CognitoAuthService } from '../../../services/auth/cognito/cognito-auth.service';
import { EntityHistoryValidators } from '../validators/entity-history.validator';

class EntityHistoryEntryUser extends BaseValueObject<EntityHistoryEntryUser> {
    readonly id?: string;
    readonly email?: string;
}

class EntityHistoryEntry extends BaseValueObject<EntityHistoryEntry> {
    readonly type!: string;
    readonly date!: Date;
    readonly id?: string;
    readonly value!: unknown;
    readonly oldSnapshot!: unknown;
    readonly newSnapshot!: unknown;
    readonly diff?: unknown;
    readonly user!: EntityHistoryEntryUser;
}

class EntityHistory extends BaseValueObject<EntityHistory> {
    readonly entityTypeName!: string;
    readonly entityId!: string;
    readonly events!: Array<EntityHistoryEntry>;
}

@Query({ authorize: 'all' })
export class GetEntityHistory extends BaseQuery<GetEntityHistory> {
    readonly entityTypeName!: string;
    readonly entityId!: string;

    public static async handle(
        query: GetEntityHistory,
        register: Register,
    ): Promise<EntityHistory> {
        const isAllowedToViewHistory =
            await EntityHistoryValidators.isUserAllowedToViewEntityHistory(
                query.entityTypeName,
                query.entityId,
                register,
            );

        if (!isAllowedToViewHistory)
            return new EntityHistory({
                entityTypeName: query.entityTypeName,
                entityId: query.entityId,
                events: [],
            });

        const isAllowedToViewFullHistory =
            await EntityHistoryValidators.isUserAllowedToViewFullEntityHistory(
                query.entityTypeName,
                query.entityId,
                register,
            );

        const provider = Provider();
        const allEvents = await provider.events.forEntitySince(
            Booster.config,
            query.entityTypeName,
            query.entityId,
            new Date(0).toISOString(),
        );

        const events = isAllowedToViewFullHistory
            ? allEvents
            : allEvents.filter((event) => event.currentUser?.id === register.currentUser?.id);

        const userIds = chain(events.map((event) => event.currentUser?.id))
            .uniq()
            .compact()
            .value();

        const users = await Promise.all(
            userIds.map(async (userId) => {
                const user = await CognitoAuthService.getUser(userId);
                return {
                    id: user.id,
                    email: user.email,
                };
            }),
        );

        const userMap = keyBy(users, 'id');

        let snapshot = {};
        const snapshots = [{}];

        for (const event of events) {
            const reducerMetadata = Booster.config.reducers[event.typeName];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const reducer = (reducerMetadata.class as any)[reducerMetadata.methodName];
            const newSnapshot = reducer(event.value, snapshot);
            snapshots.push(newSnapshot);
            snapshot = { ...newSnapshot };
        }

        return new EntityHistory({
            entityTypeName: query.entityTypeName,
            entityId: query.entityId,
            events: events.map(
                (event, index) =>
                    new EntityHistoryEntry({
                        type: event.typeName,
                        date: new Date(event.createdAt),
                        id: event.id,
                        value: event.value,
                        oldSnapshot: snapshots[index],
                        newSnapshot: snapshots[index + 1],
                        diff: deepDiff(snapshots[index], snapshots[index + 1]),
                        user: new EntityHistoryEntryUser({
                            id: event.currentUser?.id,
                            email: event.currentUser?.id && userMap[event.currentUser.id]?.email,
                        }),
                    }),
            ),
        });
    }
}

function deepDiff(oldObj: Record<string, unknown> | Date, newObj: Record<string, unknown> | Date) {
    // Handle Date objects
    if (oldObj instanceof Date || newObj instanceof Date) {
        const oldTime = oldObj instanceof Date ? oldObj.getTime() : oldObj;
        const newTime = newObj instanceof Date ? newObj.getTime() : newObj;
        if (oldTime === newTime) {
            return undefined;
        }
        return { oldValue: oldObj, newValue: newObj };
    }

    if (
        typeof oldObj !== 'object' ||
        oldObj === null ||
        typeof newObj !== 'object' ||
        newObj === null
    ) {
        // primitive or array values
        if (JSON.stringify(oldObj) === JSON.stringify(newObj)) {
            return undefined;
        }
        return { oldValue: oldObj, newValue: newObj };
    }

    const keys = new Set([...Object.keys(oldObj || {}), ...Object.keys(newObj || {})]);
    const result: Record<string, unknown> = {};

    keys.forEach((key) => {
        const change = deepDiff(
            oldObj?.[key] as Record<string, unknown>,
            newObj?.[key] as Record<string, unknown>,
        );
        if (change !== undefined) {
            result[key] = change;
        }
    });

    return Object.keys(result).length ? result : undefined;
}
