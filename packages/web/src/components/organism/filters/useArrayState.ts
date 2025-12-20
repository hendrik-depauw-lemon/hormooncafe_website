import { useCallback, useState } from 'react';

type Updater<T> = T | ((prev: T) => T);

export function useArrayState<T>(initial: T[] | (() => T[]) = []) {
    const [value, setValue] = useState<T[]>(
        typeof initial === 'function' ? (initial as () => T[])() : initial,
    );

    const push = useCallback((...items: T[]) => {
        setValue((arr) => arr.concat(items));
    }, []);

    const replace = useCallback((index: number, next: Updater<T>) => {
        setValue((arr) =>
            arr.map((item, i) =>
                i === index
                    ? typeof next === 'function'
                        ? (next as (p: T) => T)(item)
                        : next
                    : item,
            ),
        );
    }, []);

    const replaceAll = useCallback((next: T[]) => setValue(next), []);

    const remove = useCallback((index: number) => {
        setValue((arr) => arr.filter((_, i) => i !== index));
    }, []);

    const clear = useCallback(() => setValue([]), []);

    return {
        value,
        push,
        replace,
        replaceAll,
        remove,
        clear,
    } as const;
}
