import { Register } from '@boostercloud/framework-types';

import { ProgressReportService } from '../progress-report.service';

export type Job = (
    register: Register,
    reporter: ProgressReportService,
    data?: string,
) => Promise<void>;
