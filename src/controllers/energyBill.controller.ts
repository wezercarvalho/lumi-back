import {
    getAllEnergyBills,
    getEnergyBillByClientAndMonth,
    getEnergyBillPath,
} from '@services/energyBill.service'
import { BaseResponse } from '@utils/base/BaseResponse'
import { Request, Response } from 'express'

export const getEnergyBills = async (_: Request, res: Response) => {
    const energyBills = await getAllEnergyBills()

    res.json(
        new BaseResponse({
            success: true,
            message: 'Carregado com sucesso.',
            statusCode: 200,
            typeMessage: 'success',
            response: energyBills,
        }),
    )
}

export const downloadEnergyBill = async (req: Request, res: Response) => {
    const energyBillId = req.params.id

    if (!energyBillId)
        res.json(
            new BaseResponse({
                success: true,
                message: 'Informe a fatura que será baixada.',
                statusCode: 404,
                typeMessage: 'error',
            }),
        )

    const energyBillPath = await getEnergyBillPath(+energyBillId)

    res.download(energyBillPath, (err) => {
        if (err) {
            res.json(
                new BaseResponse({
                    success: true,
                    message: 'Não foi possível baixar a fatura.',
                    statusCode: 500,
                    typeMessage: 'error',
                }),
            )
        }
    })
}

export const getEnergyBillByClientAndPeriod = async (
    req: Request,
    res: Response,
) => {
    const clientNumber = +req.params.clientNumber
    const refMonth = req.params.refMonth

    const energyBill = await getEnergyBillByClientAndMonth(
        clientNumber,
        refMonth,
    )

    res.json(
        new BaseResponse({
            success: true,
            message: 'Carregado com sucesso.',
            statusCode: 200,
            typeMessage: 'success',
            response: energyBill,
        }),
    )
}
