export interface UserRepository {
    getUserMaps: (token: string) => Promise<string[]>,
}
