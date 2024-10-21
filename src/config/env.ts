import dotenv from 'dotenv'

import { IEnvironmentVariables } from '../types/environmentVariables'

dotenv.config()

export const environmentVariables: IEnvironmentVariables = {
    port: Number(process.env.PORT) || 3001,
    db: {
        host: process.env.DB_HOST || '',
        username: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || '',
        port: Number(process.env.DB_PORT),
    },
}
