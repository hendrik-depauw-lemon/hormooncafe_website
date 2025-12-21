import { ReactNode } from 'react';

// These tags are available
type Tag = 'p' | 'b' | 'i' | 'ul' | 'li';

type Props = {
    className?: string;
    children(tags: Record<Tag, (chunks: ReactNode) => ReactNode>): ReactNode;
};

export default function RichText({ children, className }: Props) {
    return (
        <div className={`prose whitespace-pre-wrap ${className}`}>
            {children({
                p: (chunks: ReactNode) => <p>{chunks}</p>,
                b: (chunks: ReactNode) => <b className="font-semibold">{chunks}</b>,
                i: (chunks: ReactNode) => <i className="italic">{chunks}</i>,
                ul: (chunks: ReactNode) => <ul className="list-disc list-inside">{chunks}</ul>,
                li: (chunks: ReactNode) => <li>{chunks}</li>,
            })}
        </div>
    );
}
