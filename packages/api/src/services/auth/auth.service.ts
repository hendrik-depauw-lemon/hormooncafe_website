import { Role } from '../../modules/system/roles/role.enum';

export abstract class AuthService {
    static readonly createUser: (
        email: string,
        groups: Role[],
        emailVerified: boolean,
    ) => Promise<{ username: string }>;
    static readonly getUser: (id: string) => Promise<{ id: string; email?: string }>;
    static readonly getUsers: (
        limit: number,
        paginationToken?: string,
        filter?: string,
    ) => Promise<{ users: { id: string; email?: string }[]; paginationToken?: string }>;
    static readonly assignUserToGroups: (username: string, groups: Role[]) => Promise<void>;
    static readonly assignUserToGroup: (username: string, group: Role) => Promise<void>;
    static readonly removeUserFromGroup: (username: string, group: Role) => Promise<void>;
    static readonly deleteUser: (username: string) => Promise<void>;
    static readonly disableUser: (username: string) => Promise<void>;
}
