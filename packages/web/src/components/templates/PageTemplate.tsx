import { PropsWithChildren } from 'react';

type PageTemplateProps = PropsWithChildren;

export function PageTemplate({ children }: PageTemplateProps) {
    return (
        <div className="flex flex-1 flex-col w-full min-h-full gap-6 px-5 pb-5 md:px-6 md:pb-6 md:pt-3 relative">
            {children}
        </div>
    );
}
