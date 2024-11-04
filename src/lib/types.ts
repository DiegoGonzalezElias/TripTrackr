export interface ErrorWithResponse extends Error {
    response?: {
        status: number;
    };
}