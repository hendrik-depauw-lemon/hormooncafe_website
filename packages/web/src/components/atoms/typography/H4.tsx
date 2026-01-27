import { PropsWithChildren } from 'react';

type H4Props = PropsWithChildren;

export function H4({ children }: H4Props) {
    return (
        <h4 className="font-special font-bold scroll-m-20 text-sm lg:text-base font-bold text-balance overflow-ellipsis overflow-hidden">
            {children}
        </h4>
    );
}
