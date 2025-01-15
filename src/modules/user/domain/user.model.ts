export interface UserRepository {
    getUserMaps: (token: string) => Promise<string[]>,
    deleteUserAcc: (token: string) => Promise<Response>,
}
