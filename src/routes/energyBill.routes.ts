import {
    getEnergyBills,
    downloadEnergyBill,
    getEnergyBillByClientAndPeriod,
} from '@controllers/energyBill.controller'
import { Router } from 'express'

const router = Router()

router.get('/energy-bills', getEnergyBills)
router.get('/energy-bill/download/:id', downloadEnergyBill)
router.get(
    '/energy-bill/:clientNumber/:refMonth',
    getEnergyBillByClientAndPeriod,
)

export default router
