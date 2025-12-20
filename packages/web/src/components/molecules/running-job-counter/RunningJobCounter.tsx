'use client';

import { useQuery, useSubscription } from '@urql/next';
import { useEffect, useState } from 'react';

import { getJobsStatusQuery } from '@/src/components/molecules/running-job-counter/_queries/getJobsStatusQuery';
import { getJobExecutionsStatusSubscription } from '@/src/components/molecules/running-job-counter/_subscriptions/getJobsStatusSubscription';
import { JobExecutionStatus } from '@/src/gql/generated/graphql';

export const RunningJobCounter = () => {
    const [queryResult] = useQuery({
        query: getJobsStatusQuery,
        variables: {
            filter: {
                or: [
                    { status: { eq: JobExecutionStatus.InProgress } },
                    { status: { eq: JobExecutionStatus.Pending } },
                ],
            },
        },
    });

    const [jobs, setJobs] = useState(queryResult.data?.ListJobExecutionReadModels.items ?? []);

    const [_] = useSubscription(
        {
            query: getJobExecutionsStatusSubscription,
        },
        (_, next) => {
            if (next?.JobExecutionReadModels) {
                const newJob = next?.JobExecutionReadModels;
                if (jobs.find((job) => job.id === newJob.id)) {
                    if (newJob.status === JobExecutionStatus.Completed) {
                        setJobs(jobs.filter((job) => job.id !== newJob.id));
                    }
                } else {
                    if (
                        newJob.status === JobExecutionStatus.Pending ||
                        newJob.status === JobExecutionStatus.InProgress
                    ) {
                        setJobs([...jobs, newJob]);
                    }
                }
            }
            return next;
        },
    );

    useEffect(() => {
        setJobs(queryResult.data?.ListJobExecutionReadModels.items ?? []);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryResult]);

    return <>{jobs.length ? jobs.length : ''}</>;
};
