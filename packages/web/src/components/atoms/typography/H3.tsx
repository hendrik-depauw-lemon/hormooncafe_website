import { PropsWithChildren } from 'react';

type H3Props = PropsWithChildren;

export function H3({ children }: H3Props) {
    return (
        <h3 className="font-special scroll-m-20 text-base lg:text-lg font-bold text-balance overflow-ellipsis overflow-hidden">
            {children}
        </h3>
    );
}
