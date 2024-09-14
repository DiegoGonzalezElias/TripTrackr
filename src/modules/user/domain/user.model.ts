export interface UserRepository {
    getMyRole: () => Role,
    getNumberOfUsers: () => Promise<number>,
    getCurrentUserName: () => string,
    getCurrentUserId: () => string,
    getUsers: () => Promise<User[]>,
    getUserById: (id: string) => Promise<User>,
    modifyUserById: (id: string, data: User) => Promise<Request>,
    createNewUser: (data: User) => Promise<Request>,
    removeUserById: (id: string) => Promise<Request>,
}

export interface User {
    userName: string,
    role: Role,
    token: string | undefined
}

export enum Role {
    SuperAdmin = 'superAdmin',
    Admin = 'admin',
    Viewer = 'viewer',
}