export interface IEnvironmentVariables {
    port: number
    db: {
        host: string
        username: string
        password: string
        database: string
        port: number
    }
}
