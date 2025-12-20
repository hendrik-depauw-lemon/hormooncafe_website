import { orderBy } from 'lodash-es';
import { useTranslations } from 'next-intl';

import { LoadingSpinner } from '@/src/components/atoms/LoadingSpinner';
import { InlineCode } from '@/src/components/atoms/typography/InlineCode';

import { JobExecutionReadModelQuery } from '../../../../../../../../src/gql/generated/graphql';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../../../../../../../src/shadcn/components/ui/card';
import { formatDateTime } from '../../../../../../../../src/utils/formatDate';

type JobMessagesProps = {
    initialValues?: NonNullable<JobExecutionReadModelQuery['JobExecutionReadModel']> | null;
};

export function JobMessages({ initialValues }: JobMessagesProps) {
    const t = useTranslations('job.details.0.messages');

    if (!initialValues) return <LoadingSpinner />;

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('title')}</CardTitle>
                <CardDescription>{t('lead')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col-reverse max-h-[300px] overflow-y-auto mt-2">
                    {orderBy(initialValues?.messages, 'timestamp', 'desc').map((message, index) => (
                        <InlineCode key={index}>
                            {`[${formatDateTime(message.timestamp)}]: ${message.message}`}
                        </InlineCode>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
