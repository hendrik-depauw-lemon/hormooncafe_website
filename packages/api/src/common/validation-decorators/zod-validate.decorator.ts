import { ZodSchema } from 'zod';

export type ZodValidateOptions = {
    optional?: boolean;
};

const valuesMap = new WeakMap<object, Map<string, unknown>>();

export const ZodValidate = (schema: ZodSchema, options?: ZodValidateOptions) => {
    return (target: object, propertyKey: string) => {
        const getter = function (this: object) {
            const instanceValues = valuesMap.get(this) || new Map();
            return instanceValues.get(propertyKey);
        };

        const setter = function (this: object, newValue: unknown) {
            const result = options?.optional
                ? schema.nullish().safeParse(newValue)
                : schema.safeParse(newValue);
            if (!result.success) {
                throw new Error(
                    `Validation failed for property "${propertyKey}": ${JSON.stringify(result.error.format(), null, 2)}`,
                );
            }
            let instanceValues = valuesMap.get(this);
            if (!instanceValues) {
                instanceValues = new Map();
                valuesMap.set(this, instanceValues);
            }
            instanceValues.set(propertyKey, newValue);
        };

        // Get the existing property descriptor if it exists
        const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {};

        // Chain the existing getter and setter if they exist
        const originalGetter = descriptor.get || getter;
        const originalSetter = descriptor.set || setter;

        Object.defineProperty(target, propertyKey, {
            get: function () {
                return originalGetter.call(this);
            },
            set: function (newValue: unknown) {
                setter.call(this, newValue);
                originalSetter.call(this, newValue);
            },
            enumerable: true,
            configurable: true,
        });
    };
};
