import { PropsWithChildren } from 'react';

type H1Props = PropsWithChildren;

export function H1({ children }: H1Props) {
    return (
        <h1 className="scroll-m-20 text-xl lg:text-2xl font-bold text-balance overflow-ellipsis overflow-hidden">
            {children}
        </h1>
    );
}
