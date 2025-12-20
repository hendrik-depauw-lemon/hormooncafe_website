import { Register, UUID } from '@boostercloud/framework-types';
import { cpus } from 'os';
import { resolve } from 'path';
import { Piscina } from 'piscina';

import { JobCouldNotBeCancelledError } from './errors/job-could-not-be-cancelled.error';
import { JobKey } from './job/job-key';
import { JobExecutionCreated } from './job-execution/events/job-execution-created.event';
import { ProgressReportService } from './progress-report.service';
import { WorkerInput } from './worker';

/**
 * The JobService runs predefined long-running tasks.
 *
 * We run this tasks in a seperate worker-thread:
 *  If we run in the main event-loop the server might not
 *  be able to respond to important health sensor causing a
 *  system shutdown.
 *
 * We use Tinypool for our worker-threads. It will load any worker functions
 * from the worker.ts file. The current worker-function parses data and start
 * a job defined in the job-register jobFunctionMap constant. We do this because
 * we cannot serialize functions across worker-threads.
 *
 * Additionally the worker function starts a lobotomized Booster instance using
 * config.runWebServer = false. This ensures that it has Register and ReadModel
 * access without being blocken on ports.
 *
 * There are 2 ways to start a job
 * 1. On-command using JobService.runJob()
 * 2. Scheduled using cron timers using JobService.scheduleJob()
 * They also take a data command which can be used to pass data to the job function.
 * BUT, we cannot guarantee typing accross the thread boundary so be carefull and
 * thread the inputs of your jobFunction data as unknown.
 *
 *
 * Important:
 *  Worker threads re-interpret the whole code base. Side-effects
 *  that are performed on import should be highly scrutinized. If
 *  the side-effect is necessary, there is space for them in the
 *  index.ts file
 */
export class JobService {
    static pool: Piscina | undefined;
    static abortControllers: Record<string, AbortController> = {};

    public static async initiate() {
        const maxThreads = cpus().length - 1;
        console.log(`Initiating JobService with ${maxThreads} worker threads`);
        JobService.pool = new Piscina({
            filename: resolve(__dirname, './worker.js'),
            concurrentTasksPerWorker: 1,
            maxThreads,
            minThreads: 1,
        });
    }

    public static async runJob(
        name: string,
        jobKey: JobKey,
        data: string | undefined,
        register: Register,
        scheduledJobId?: UUID,
    ): Promise<UUID> {
        const jobId = UUID.generate();
        register.events(new JobExecutionCreated({ id: jobId, name, jobKey, scheduledJobId, data }));

        await register.flush();

        const workerInput: WorkerInput = { jobId, jobKey, data };
        const abortController = new AbortController();

        void JobService.pool
            ?.run(workerInput, { name: 'runJob', signal: abortController.signal })
            .catch(async (error) => {
                const progressReportService = new ProgressReportService(jobId, register);
                if (error instanceof Error && error.name === 'AbortError') {
                    await progressReportService.cancel();
                } else {
                    await progressReportService.complete(
                        false,
                        `Job failed with error: ${error.message || error.toString()}`,
                    );
                }
            })
            .finally(() => {
                delete JobService.abortControllers[jobId.toString()];
            });

        JobService.abortControllers[jobId.toString()] = abortController;
        return jobId;
    }

    public static cancelJob(jobId: UUID): void {
        const abortController = JobService.abortControllers[jobId.toString()];
        if (!abortController) throw new JobCouldNotBeCancelledError(jobId);

        abortController.abort();
        delete JobService.abortControllers[jobId.toString()];
    }

    public static cancelAllRunningJobs(): void {
        console.log('Cancelling all running jobs');
        Object.values(JobService.abortControllers).forEach((abortController) => {
            abortController.abort();
        });
        JobService.abortControllers = {};
    }
}
