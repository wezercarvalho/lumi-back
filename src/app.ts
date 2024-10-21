require('module-alias/register')

import sequelize from '@config/database/database'
import { environmentVariables } from '@config/env'
import { EnergyBill } from '@models/energyBill.model'
import energyBillRoutes from '@routes/energyBill.routes'
import { saveUploadedEnergyBill } from '@services/energyBill.service'
import cors from 'cors'
import express from 'express'

const app = express()

app.use(cors())
app.use(express.json())

// #region Routes
app.use('/api', energyBillRoutes)
//#endregion Routes

const startServer = async () => {
    try {
        await sequelize.authenticate()
        app.listen(environmentVariables.port, async () => {
            await EnergyBill.truncate()

            await saveUploadedEnergyBill('3001116735')
            await saveUploadedEnergyBill('3001422762')
        })
    } catch (error) {
        process.exit(1)
    }
}

startServer()
