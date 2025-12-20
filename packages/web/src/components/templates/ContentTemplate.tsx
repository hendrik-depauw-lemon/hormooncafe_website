import { PropsWithChildren } from 'react';

import { cn } from '../../shadcn/lib/utils';
import { H1 } from '../atoms/typography/H1';
import { Lead } from '../atoms/typography/Lead';

interface ContentTemplateProps extends PropsWithChildren {
    title?: string;
    description?: string;
    actions?: React.ReactNode;
    aside?: React.ReactNode;
}

export const ContentTemplate = ({
    title,
    description,
    actions,
    aside,
    children,
}: ContentTemplateProps) => (
    <div className="flex flex-col space-y-4">
        {(title || actions || description) && (
            <div>
                <div className="flex flex-row flex-wrap justify-between gap-2">
                    {title && <H1>{title.length > 50 ? `${title.slice(0, 50)}...` : title}</H1>}
                    {actions && (
                        <div className="flex flex-row flex-wrap gap-2 items-end">{actions}</div>
                    )}
                </div>
                {description && <Lead>{description}</Lead>}
            </div>
        )}

        <div className="flex flex-col lg:flex-row gap-4">
            <div className={cn({ ['basis-3/5']: !!aside, ['w-full']: !aside })}>{children}</div>
            {aside && <aside className="basis-2/5">{aside}</aside>}
        </div>
    </div>
);
