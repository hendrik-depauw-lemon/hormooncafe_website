import {
    AppDomain,
    DomainError,
    ErrorType,
    HttpStatusCode,
} from '../../../../error-handling/error-code';

export class CognitoUpstreamError extends DomainError {
    static readonly errorCode = this.name;
    static readonly type = ErrorType.IdentityProviderError;
    static readonly statusCode = HttpStatusCode.InternalServerError;
    static readonly domain = AppDomain.Platform;

    constructor(command: string, error: unknown) {
        const message = error instanceof Error ? error.message : JSON.stringify(error);
        super({
            errorCode: CognitoUpstreamError.errorCode,
            type: CognitoUpstreamError.type,
            statusCode: CognitoUpstreamError.statusCode,
            domain: CognitoUpstreamError.domain,
            detailedMessage: `Cognito upstream error: [${command}] ${message}`,
        });
    }
}
