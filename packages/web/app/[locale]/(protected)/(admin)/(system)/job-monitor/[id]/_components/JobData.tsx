import { useTranslations } from 'next-intl';

import { JobExecutionReadModelQuery } from '../../../../../../../../src/gql/generated/graphql';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../../../../../../../src/shadcn/components/ui/card';
import { Textarea } from '../../../../../../../../src/shadcn/components/ui/textarea';

type JobDataProps = {
    initialValues?: NonNullable<JobExecutionReadModelQuery['JobExecutionReadModel']> | null;
};

export function JobData({ initialValues }: JobDataProps) {
    const t = useTranslations('job.details.0.data');

    if (!initialValues?.data) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('title')}</CardTitle>
                <CardDescription>{t('lead')}</CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea disabled value={initialValues.data} />
            </CardContent>
        </Card>
    );
}
