export interface UserRepository {
    getUserMaps: (token: string) => Promise<string[]>,
    deleteUserAcc: (token: string) => Promise<Response>,
    changePassword: (token: string, password: string, newPassword: string) => Promise<Response>,
}
