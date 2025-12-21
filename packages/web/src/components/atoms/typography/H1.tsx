import { PropsWithChildren } from 'react';

type H1Props = PropsWithChildren & { className?: string };

export function H1({ children, className }: H1Props) {
    return (
        <h1
            className={`font-special scroll-m-20 text-xl lg:text-2xl font-bold text-balance overflow-ellipsis overflow-hidden ${className}`}
        >
            {children}
        </h1>
    );
}
