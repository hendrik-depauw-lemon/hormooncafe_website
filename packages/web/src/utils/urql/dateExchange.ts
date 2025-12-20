import { Exchange } from 'urql';
import { map, pipe } from 'wonka';

export const dateExchange: Exchange = ({ forward }) => {
    return (operations$) => {
        const operationResult$ = forward(operations$);
        return pipe(
            operationResult$,
            map((value) => {
                return JSON.parse(JSON.stringify(value), (key, value) => {
                    if (typeof value === 'string') {
                        try {
                            const date = new Date(value);
                            if (date.toISOString() === value) return date;
                        } catch {
                            return value;
                        }
                    }
                    return value;
                });
            }),
        );
    };
};
