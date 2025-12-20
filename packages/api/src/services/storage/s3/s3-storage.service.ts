import { GetObjectCommand, HeadObjectCommand, PutObjectCommand, S3 } from '@aws-sdk/client-s3';
import { fromEnv } from '@aws-sdk/credential-provider-env';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { UUID } from '@boostercloud/framework-types';
import { z } from 'zod';

import { FailedToGenerateSignedUrlError } from '../error/failed-to-generate-signed-url.error';
import { StorageServiceError } from '../error/storage-service.error';
import {
    GetSignedUploadUrlOptions,
    GetSignedUploadUrlReturnType,
    headObjectReturnType,
    StorageService,
} from '../storage.service';

// eslint-disable-next-line @typescript-eslint/no-require-imports
import path = require('path');

export class S3StorageService extends StorageService {
    protected static readonly MOCK_S3 = z
        .union([z.boolean(), z.literal('true'), z.literal('false')])
        .transform((value) => value === true || value === 'true')
        .parse(process.env.MOCK_S3 || 'false');
    protected static readonly OVERWRITE_AWS_CREDENTIALS = z
        .union([z.boolean(), z.literal('true'), z.literal('false')])
        .transform((value) => value === true || value === 'true')
        .parse(process.env.OVERWRITE_AWS_CREDENTIALS || 'false');
    protected static readonly MOCK_AWS_S3_ENDPOINT = z
        .string()
        .parse(process.env.MOCK_AWS_S3_ENDPOINT || 'http://localhost:1080/mocked-s3');
    protected static readonly S3_STORAGE_BUCKET = z
        .string({ required_error: `Missing required environment variable 'S3_STORAGE_BUCKET'` })
        .parse(process.env.S3_STORAGE_BUCKET);
    protected static readonly S3_SIGNED_URL_EXPIRATION_IN_SECONDS = 600;

    private static getS3Client(mockPath?: string): S3 {
        return new S3({
            region: process.env.AWS_REGION,
            ...(this.OVERWRITE_AWS_CREDENTIALS && { credentials: fromEnv() }),
            ...(this.MOCK_S3 && {
                endpoint: this.MOCK_AWS_S3_ENDPOINT + (mockPath ?? ''),
                forcePathStyle: !this.MOCK_AWS_S3_ENDPOINT.includes('localstack'),
                requestChecksumCalculation: 'WHEN_REQUIRED',
            }),
        });
    }

    public static async getSignedUploadUrl(
        options?: GetSignedUploadUrlOptions,
    ): Promise<GetSignedUploadUrlReturnType> {
        const s3 = this.getS3Client();

        const filename = options?.filename ?? UUID.generate().toString();
        const fullPath = path.join(options?.folder ?? '', filename);

        const command = new PutObjectCommand({
            Bucket: this.S3_STORAGE_BUCKET,
            Key: fullPath,
            ...(options?.contentType && { ContentType: options?.contentType }),
        });

        try {
            const url = await getSignedUrl(s3, command, {
                expiresIn: this.S3_SIGNED_URL_EXPIRATION_IN_SECONDS,
            });
            return {
                signedUrl: url,
                fullPath: fullPath,
            };
        } catch (error: unknown) {
            console.error('Error generating signed upload URL:', error);
            throw new FailedToGenerateSignedUrlError(error);
        }
    }

    public static async getSignedDownloadUrl(key: string): Promise<string> {
        const s3 = this.getS3Client();

        const command = new GetObjectCommand({
            Bucket: this.S3_STORAGE_BUCKET,
            Key: key,
        });

        try {
            const url = await getSignedUrl(s3, command, {
                expiresIn: this.S3_SIGNED_URL_EXPIRATION_IN_SECONDS,
            });
            return url;
        } catch (error: unknown) {
            console.error('Error generating signed download URL:', error);
            throw new FailedToGenerateSignedUrlError(error);
        }
    }

    public static async headObject(key: string): Promise<headObjectReturnType> {
        const s3 = this.getS3Client();

        const command = new HeadObjectCommand({
            Bucket: this.S3_STORAGE_BUCKET,
            Key: key,
        });

        try {
            const head = await s3.send(command);
            return {
                exists: true,
                contentType: head.ContentType,
                contentLength: head.ContentLength,
                lastModified: head.LastModified,
                metadata: head.Metadata,
            };
        } catch (error: unknown) {
            console.error('Error getting object metadata:', error);
            throw new StorageServiceError(error);
        }
    }
}
