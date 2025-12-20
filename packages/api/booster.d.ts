import '@boostercloud/framework-types';

declare module '@boostercloud/framework-types' {
    interface BoosterConfig {
        readModelIndexes: Record<string, Record<string, Record<string, number>>>;
        dbProvider: 'mongodb' | 'mssql';
        runWebServer?: boolean;
        requestHandlers?: Array<RequestHandler>;
    }
}
