import { PropsWithChildren } from 'react';

import { H2 } from '../atoms/typography/H2';

interface SubContentTemplateProps extends PropsWithChildren {
    title?: string;
    actions?: React.ReactNode;
}

export const SubContentTemplate = ({ title, actions, children }: SubContentTemplateProps) => (
    <div className="flex flex-col space-y-4">
        {(title || actions) && (
            <div className="flex flex-row flex-wrap justify-between gap-2">
                {title && <H2>{title.length > 50 ? `${title.slice(0, 50)}...` : title}</H2>}
                {actions && (
                    <div className="flex flex-row flex-wrap gap-2 items-end">{actions}</div>
                )}
            </div>
        )}
        {children}
    </div>
);
