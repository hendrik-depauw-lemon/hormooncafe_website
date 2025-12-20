type Keys<Schema, Path extends string = ''> = Schema extends string
    ? Path
    : Schema extends object
      ? {
            [K in keyof Schema & string]: Keys<
                Schema[K],
                `${Path}${Path extends '' ? '' : '.'}${K}`
            >;
        }[keyof Schema & string]
      : never;

export type { Keys };
