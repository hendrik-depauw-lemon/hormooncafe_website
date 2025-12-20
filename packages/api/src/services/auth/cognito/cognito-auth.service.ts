import {
    AdminAddUserToGroupCommand,
    AdminCreateUserCommand,
    AdminDeleteUserCommand,
    AdminDisableUserCommand,
    AdminGetUserCommand,
    AdminRemoveUserFromGroupCommand,
    CognitoIdentityProviderClient,
    ListUsersCommand,
    ServiceInputTypes,
    ServiceOutputTypes,
} from '@aws-sdk/client-cognito-identity-provider';
import { fromEnv } from '@aws-sdk/credential-provider-env';
import { HttpHandlerOptions } from '@aws-sdk/types';
import { SmithyResolvedConfiguration } from '@smithy/smithy-client';
import { Command } from '@smithy/types';
import { z } from 'zod';

import { requiredEnvironmentVariable } from '../../../common/required-env-variable';
import { zodStringToBoolean } from '../../../common/zod-string-to-boolean';
import { Role } from '../../../modules/system/roles/role.enum';
import { AuthService } from '../auth.service';
import { CognitoUserGroupNotAssignedError } from './errors/cognito-user-group-not-assigned-error';
import { CognitoUserGroupNotRemovedError } from './errors/cognito-user-group-not-removed-error';
import { CognitoUserNotCreatedError } from './errors/cognito-user-not-created-error';
import { CognitoUserNotDeletedError } from './errors/cognito-user-not-deleted.error';
import { CognitoUserNotFoundError } from './errors/cognito-user-not-found.error';
import { CognitoUpstreamError } from './errors/upstream-cognito.error';

export class CognitoAuthService extends AuthService {
    protected static readonly MOCK_COGNITO = zodStringToBoolean(process.env.MOCK_COGNITO, 'false');
    protected static readonly OVERWRITE_AWS_CREDENTIALS = zodStringToBoolean(
        process.env.OVERWRITE_AWS_CREDENTIALS,
        'false',
    );
    protected static readonly POOL_ID = requiredEnvironmentVariable('AWS_COGNITO_USER_POOL_ID');
    protected static readonly AWS_REGION = requiredEnvironmentVariable('AWS_REGION');
    protected static readonly MOCK_AWS_COGNITO_ENDPOINT = z
        .string()
        .optional()
        .parse(process.env.MOCK_AWS_COGNITO_ENDPOINT);

    private static getCognitoClient(mockPath?: string): CognitoIdentityProviderClient {
        return new CognitoIdentityProviderClient({
            region: this.AWS_REGION,
            ...(this.OVERWRITE_AWS_CREDENTIALS && { credentials: fromEnv() }),
            ...(this.MOCK_COGNITO && {
                endpoint: this.MOCK_AWS_COGNITO_ENDPOINT + (mockPath ?? ''),
            }),
        });
    }

    private static async sendCommand<
        InputType extends ServiceInputTypes,
        OutputType extends ServiceOutputTypes,
    >(
        client: CognitoIdentityProviderClient,
        command: Command<
            ServiceInputTypes,
            InputType,
            ServiceOutputTypes,
            OutputType,
            SmithyResolvedConfiguration<HttpHandlerOptions>
        >,
    ): Promise<OutputType> {
        try {
            return await client.send(command);
        } catch (error: unknown) {
            throw new CognitoUpstreamError(command.constructor.name, error);
        }
    }

    public static async createUser(
        email: string,
        groups: Role[],
        emailVerified: boolean = false,
    ): Promise<{
        username: string;
    }> {
        const command = new AdminCreateUserCommand({
            UserPoolId: this.POOL_ID,
            Username: email,
            UserAttributes: [
                { Name: 'email', Value: email },
                { Name: 'email_verified', Value: emailVerified ? 'True' : 'False' },
            ],
        });

        const client = this.getCognitoClient('/create-user');
        const result = await this.sendCommand(client, command);
        if (!result.User?.Username) {
            throw new CognitoUserNotCreatedError(email);
        }

        const username = result.User.Username;
        await this.assignUserToGroups(username, groups);

        return { username };
    }

    public static async getUser(id: string): Promise<{ id: string; email?: string }> {
        const command = new AdminGetUserCommand({
            UserPoolId: this.POOL_ID,
            Username: id,
        });

        const client = this.getCognitoClient('/get-user');
        const result = await this.sendCommand(client, command);

        return CognitoAuthService.cognitoUserToAuthUser(result);
    }

    public static async getUsers(
        limit: number,
        paginationToken?: string,
        filter?: string,
    ): Promise<{ users: { id: string; email?: string }[]; paginationToken?: string }> {
        const command = new ListUsersCommand({
            UserPoolId: this.POOL_ID,
            Limit: limit,
            PaginationToken: paginationToken,
            Filter: filter,
        });

        const client = this.getCognitoClient('/get-users');
        const result = await this.sendCommand(client, command);

        if (!result.Users) {
            return { users: [], paginationToken: result.PaginationToken };
        }

        return {
            users: result.Users.map((user) => CognitoAuthService.cognitoUserToAuthUser(user)),
            paginationToken: result.PaginationToken,
        };
    }

    public static async assignUserToGroups(username: string, groups: Role[]): Promise<void> {
        for (const group of groups) {
            await this.assignUserToGroup(username, group);
        }
    }

    public static async assignUserToGroup(username: string, group: Role): Promise<void> {
        const groupCommand = new AdminAddUserToGroupCommand({
            UserPoolId: this.POOL_ID,
            GroupName: group,
            Username: username,
        });

        const client = this.getCognitoClient('/add-user-to-group');
        const groupResult = await this.sendCommand(client, groupCommand);
        if (groupResult.$metadata.httpStatusCode !== 200) {
            throw new CognitoUserGroupNotAssignedError(username, group);
        }
    }

    public static async removeUserFromGroup(username: string, group: Role): Promise<void> {
        const groupCommand = new AdminRemoveUserFromGroupCommand({
            UserPoolId: this.POOL_ID,
            GroupName: group,
            Username: username,
        });

        const client = this.getCognitoClient('/remove-user-from-group');
        const groupResult = await this.sendCommand(client, groupCommand);
        if (groupResult.$metadata.httpStatusCode !== 200) {
            throw new CognitoUserGroupNotRemovedError(username, group);
        }
    }

    public static async deleteUser(username: string): Promise<void> {
        const command = new AdminDeleteUserCommand({
            UserPoolId: this.POOL_ID,
            Username: username,
        });

        const client = this.getCognitoClient('/delete-user');

        const result = await this.sendCommand(client, command).catch((error) => {
            if (error.name === 'UserNotFoundException') {
                throw new CognitoUserNotFoundError(username);
            } else {
                throw new CognitoUserNotDeletedError(username);
            }
        });

        if (result?.$metadata.httpStatusCode !== 200) {
            throw new CognitoUserNotDeletedError(username);
        }
    }

    public static async disableUser(username: string): Promise<void> {
        const params = {
            UserPoolId: this.POOL_ID,
            Username: username,
        };
        const command = new AdminDisableUserCommand(params);

        const client = this.getCognitoClient('/disable-user');
        const result = await client.send(command);

        if (result.$metadata.httpStatusCode !== 200) {
            throw new CognitoUpstreamError(
                'AdminEnableUserCommand',
                JSON.stringify(result.$metadata),
            );
        }
    }

    private static cognitoUserToAuthUser(
        user: {
            Username?: string;
            UserAttributes?: { Name?: string; Value?: string }[];
            Attributes?: { Name?: string; Value?: string }[];
            UserStatus?: string;
        },
        errorId?: string,
    ): { id: string; email?: string; status?: string } {
        const id = user.Username;

        if (!id) {
            throw new CognitoUserNotFoundError(errorId || 'unknown');
        }

        const attributes = user.UserAttributes ?? user.Attributes ?? [];
        const email = attributes.find((attribute) => attribute.Name === 'email')?.Value;

        return { id, email, status: user.UserStatus };
    }
}
