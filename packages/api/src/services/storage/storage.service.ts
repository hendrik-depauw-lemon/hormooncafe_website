export type GetSignedUploadUrlOptions = {
    folder?: string;
    filename?: string;
    contentType?: string;
};

export type GetSignedUploadUrlReturnType = {
    signedUrl: string;
    fullPath: string;
};

export type headObjectReturnType = {
    exists: boolean;
    contentType?: string;
    contentLength?: number;
    lastModified?: Date;
    metadata?: Record<string, string>;
};

export abstract class StorageService {
    static readonly getSignedUploadUrl: (
        options?: GetSignedUploadUrlOptions,
    ) => Promise<GetSignedUploadUrlReturnType>;
    static readonly getSignedDownloadUrl: (key: string) => Promise<string>;
    static readonly headObject: (key: string) => Promise<headObjectReturnType>;
}
