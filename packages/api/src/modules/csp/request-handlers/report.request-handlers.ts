import { UUID } from '@boostercloud/framework-types';
import { RequestHandler } from '@lemoncompanies/booster-framework-provider-micro';
import * as express from 'express';

import { CspReportNotification } from '../notifications/csp-report.notification';

export const reportRequestHandler: RequestHandler = {
    path: '/csp/report',
    method: 'post',
    authorize: 'all',
    requestHandler: async (req: express.Request, register) => {
        const report = JSON.parse(req.body);
        register.events(new CspReportNotification({ id: UUID.generate(), report }));
    },
};
