import { PropsWithChildren } from 'react';

type H2Props = PropsWithChildren & { className?: string };

export function H2({ children, className }: H2Props) {
    return (
        <h2
            className={`font-special scroll-m-20 text-lg lg:text-xl font-bold text-balance overflow-ellipsis overflow-hidden ${className}`}
        >
            {children}
        </h2>
    );
}
