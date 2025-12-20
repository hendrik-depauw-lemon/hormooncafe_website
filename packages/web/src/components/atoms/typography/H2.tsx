import { PropsWithChildren } from 'react';

type H2Props = PropsWithChildren;

export function H2({ children }: H2Props) {
    return (
        <h2 className="scroll-m-20 text-lg lg:text-xl font-bold text-balance overflow-ellipsis overflow-hidden">
            {children}
        </h2>
    );
}
