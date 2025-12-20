import { UUID } from '@boostercloud/framework-types';

export abstract class BaseValueObject<M extends BaseValueObject<M>> {
    constructor(obj: M) {
        Object.assign(this, obj);
    }
}

export abstract class BaseCommand<M extends BaseCommand<M>> {
    constructor(obj: M) {
        Object.assign(this, obj);
    }
}
export abstract class BaseQuery<M extends BaseQuery<M>> {
    constructor(obj: M) {
        Object.assign(this, obj);
    }
}
export abstract class BaseEventHandler<M extends BaseEventHandler<M>> {
    constructor(obj: M) {
        Object.assign(this, obj);
    }
}
export abstract class BaseEvent<M extends BaseEvent<M>> {
    readonly eventTime!: Date;

    constructor(obj: Omit<M, 'entityID' | 'eventTime'>) {
        Object.assign(this, obj);
        if (!this.eventTime) this.eventTime = new Date();
    }
}
export abstract class BaseEntity<M extends BaseEntity<M>> {
    readonly id!: UUID;
    readonly createdAt!: Date;
    readonly updatedAt!: Date;
    readonly deletedAt?: Date;

    constructor(obj: M) {
        if (!obj) return; // Booster creates instances without passing arguments
        Object.assign(this, obj);
    }
}
export abstract class BaseReadModel<M extends BaseReadModel<M>> {
    readonly id!: UUID;

    constructor(obj: M) {
        if (!obj) return; // Booster creates instances without passing arguments
        Object.assign(this, obj);
    }
}
