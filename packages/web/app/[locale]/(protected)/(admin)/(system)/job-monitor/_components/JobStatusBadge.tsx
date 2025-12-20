import { Ban, Check, Clock, LoaderCircle, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { JobExecutionStatus } from '../../../../../../../src/gql/generated/graphql';
import { Badge } from '../../../../../../../src/shadcn/components/ui/badge';

const getBadgeVariant = (status: JobExecutionStatus) => {
    switch (status) {
        case JobExecutionStatus.Pending:
            return 'outline';
        case JobExecutionStatus.InProgress:
            return 'secondary';
        case JobExecutionStatus.Completed:
            return 'default';
        case JobExecutionStatus.Failed:
        case JobExecutionStatus.Canceled:
            return 'destructive';
    }
};

const getBadgeIcon = (status: JobExecutionStatus) => {
    switch (status) {
        case JobExecutionStatus.Pending:
            return <Clock />;
        case JobExecutionStatus.InProgress:
            return <LoaderCircle className="animate-spin" />;
        case JobExecutionStatus.Completed:
            return <Check />;
        case JobExecutionStatus.Failed:
            return <X />;
        case JobExecutionStatus.Canceled:
            return <Ban />;
    }
};

type JobStatusBadgeProps = {
    status: JobExecutionStatus;
};

export function JobStatusBadge({ status }: JobStatusBadgeProps) {
    const t = useTranslations('job.status');

    return (
        <Badge variant={getBadgeVariant(status)}>
            {getBadgeIcon(status)} {t(status)}
        </Badge>
    );
}
