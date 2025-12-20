if (process.env.AIKIDO_TOKEN) require('@aikidosec/firewall');
import { Booster } from '@boostercloud/framework-core';
import { BoosterConfig, Level } from '@boostercloud/framework-types';
import { Piscina } from 'piscina';
import { z } from 'zod';

import { CognitoJwtTokenVerifier } from './common/token-verifiers/cognio-jwt-token-verifier';
import { zodStringToBoolean } from './common/zod-string-to-boolean';
import { reportRequestHandler } from './modules/csp/request-handlers/report.request-handlers';
import { JobService } from './services/jobs/job.service';
import { ScheduledJobService } from './services/jobs/scheduled-job.service';

export {
    Booster,
    boosterEventDispatcher,
    boosterNotifySubscribers,
    boosterRocketDispatcher,
    boosterServeGraphQL,
    boosterTriggerScheduledCommand,
} from '@boostercloud/framework-core';

const logLevelSchema = z.enum(['debug', 'info', 'warn', 'error']).default('info');
const logLevel = logLevelSchema.parse(process.env.LOG_LEVEL);

async function main(isMainThread: boolean) {
    Booster.configureCurrentEnv((config: BoosterConfig): void => {
        config.appName = `package-name`;
        config.providerPackage = '@lemoncompanies/booster-framework-provider-micro';
        config.logLevel = Level[logLevel];
        config.enableGraphQLIntrospection = zodStringToBoolean(
            process.env.ENABLE_GRAPHQL_INTROSPECTION,
            'false',
        );
        config.dbProvider = z
            .union([z.literal('mongodb'), z.literal('mssql')])
            .parse(process.env.DB_PROVIDER ?? 'mongodb');
        config.runWebServer = isMainThread;
        config.requestHandlers = [reportRequestHandler];

        if (isMainThread) {
            if (process.env.JWKS_ISSUER && process.env.JWKS_URI) {
                config.tokenVerifiers = [
                    new CognitoJwtTokenVerifier(process.env.JWKS_ISSUER, process.env.JWKS_URI),
                ];
            } else {
                console.log(`Missing JWKS configuration, skipping token verification`);
            }

            if (require.main === module) {
                void import('@lemoncompanies/booster-framework-provider-micro').then(
                    async ({ Provider }) => {
                        const port = +(process.env.PORT || 4000);
                        await Provider().infrastructure().start?.(config, port);
                        console.log(`Started server on port ${port} 🚀\n`);
                    },
                );
            }
        }
    });

    Booster.start(__dirname);
    if (isMainThread) {
        // Perform import time side-effects here
        await JobService.initiate();
        await ScheduledJobService.initiate();

        const signalsToCloseHttpServerOn: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
        signalsToCloseHttpServerOn.forEach((signal) => {
            process.on(signal, async () => {
                JobService.cancelAllRunningJobs();
            });
        });
    }
}

void main(!Piscina.isWorkerThread);
