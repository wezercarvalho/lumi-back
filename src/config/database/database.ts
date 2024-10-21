import { environmentVariables } from '@config/env'
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'postgres',
    database: environmentVariables.db.database,
    host: environmentVariables.db.host,
    username: environmentVariables.db.username,
    password: environmentVariables.db.password,
})

export default sequelize
