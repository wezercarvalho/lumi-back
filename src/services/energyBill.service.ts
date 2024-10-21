import fs from 'fs'
import path from 'path'

import { EnergyBill } from '@models/energyBill.model'
import { extractPdfData } from '@utils/functions/extractPdfData'
import { Result } from 'pdf-parse'
import {
    IExtractEnergyBillFieldProps,
    IExtractEnergyBillPDFProps,
} from 'types/extractEnergyBill'

/**
 * Obtém todas as fatures de energia
 * @returns
 */
export const getAllEnergyBills = async () => {
    return await EnergyBill.findAll()
}

/**
 * Obtém o diretório de uma fatura
 * @param id - Identificador do registro
 * @returns
 */
export const getEnergyBillPath = async (id: number) => {
    const energyBill = await EnergyBill.findByPk(id)

    if (!energyBill) throw new Error('Fatura não encontrada.')

    // Verifica se o arquivo existe
    if (fs.existsSync(energyBill.invoicePath)) {
        return energyBill.invoicePath
    } else {
        throw new Error('Fatura não encontrada.')
    }
}

/**
 * Obtém a fatura conforme o cliente e mês
 * @param clientNumber - Número do cliente
 * @param refMonth - Mês de referência
 * @returns
 */
export const getEnergyBillByClientAndMonth = async (
    clientNumber: number,
    refMonth: string,
) => {
    const energyBill = await EnergyBill.findOne({
        where: {
            clientNumber,
            refMonth,
        },
    })

    if (!energyBill) throw new Error('Fatura não encontrada.')

    return energyBill
}

/**
 * Realiza o salvamento dos uploads conforme número da instalação
 * @param instalationCode - Código da instalação
 */
export const saveUploadedEnergyBill = async (instalationCode: string) => {
    const pathFiles = getEnergyBillFiles(instalationCode)
    // console.warn('pathFiles', pathFiles)

    pathFiles.forEach(async (pathFile) => {
        const file = await extractPdfData(pathFile)

        const model = await populateModel(file)

        model.energyUsage =
            model.electricalEnergyQtd + model.energySCEEWithoutICMSQtd
        model.totalValueWithouGD =
            model.electricalEnergyValue +
            model.energySCEEWithoutICMSValue +
            model.municipalPublicLightingContribution
        model.invoicePath = pathFile

        model.save()
    })
}

/**
 * Obtém os caminhos dos pdfs conforme o nº de instalação
 * @param instalationCode - Código/Nº da instalação
 * @returns
 */
const getEnergyBillFiles = (instalationCode: string) => {
    try {
        const invoicesDir = path.resolve(
            __dirname,
            '..',
            '..',
            'src',
            'utils',
            'uploads',
            'faturas',
            `Instalação_ ${instalationCode}`,
        )

        return fs
            .readdirSync(invoicesDir)
            .filter((file) => file.endsWith('.pdf'))
            .map((invoiceFile) => path.join(invoicesDir, invoiceFile))
    } catch (error) {
        throw error
    }
}

/**
 * popula a model com os valores para salvar
 * @param file - Arquivo contendo as informações da fatura
 * @returns
 */
const populateModel = async (file: Result) => {
    try {
        const fileSplittedLines = file.text.split('\n')

        const model = EnergyBill.build()

        Object.keys(extractEnergyBillParams).forEach(
            (key: keyof IExtractEnergyBillFieldProps) => {
                const fileInfoParams = extractEnergyBillParams[key]

                const lineIndex = fileSplittedLines.findIndex((line) =>
                    line.includes(fileInfoParams.searchTerm),
                )

                const lineSplittedValues = fileSplittedLines[
                    lineIndex + fileInfoParams.rowRef
                ]
                    .split(' ')
                    .filter((filter) => filter)

                if (lineSplittedValues)
                    setModelValue(
                        model,
                        key,
                        lineSplittedValues,
                        fileInfoParams,
                    )
            },
        )

        return model
    } catch (error) {
        throw error
    }
}

/**
 * Seta os valores na model fazendo o parse
 * @param model - Model
 * @param key - Chave
 * @param lineSplittedValues - Valores da linha
 * @param fileInfoParams - Parâmetros para extração do dado
 */
const setModelValue = (
    model: EnergyBill,
    key: keyof IExtractEnergyBillFieldProps,
    lineSplittedValues: string[],
    fileInfoParams: IExtractEnergyBillPDFProps,
) => {
    const value = lineSplittedValues[fileInfoParams.positionRef]

    switch (key) {
        case 'clientNumber':
            model.clientNumber = parseInt(value)
            break
        case 'instalationCode':
            model.instalationCode = parseInt(value)
            break
        case 'refMonth':
            model.refMonth = value
            break
        case 'electricalEnergyQtd':
            model.electricalEnergyQtd = parseInt(value.replace(/\./g, ''))
            break
        case 'electricalEnergyValue':
            model.electricalEnergyValue = parseFloat(
                value.replace(/\./g, '').replace(',', '.'),
            )
            break
        case 'energySCEEWithoutICMSQtd':
            model.energySCEEWithoutICMSQtd = parseInt(value.replace(/\./g, ''))
            break
        case 'energySCEEWithoutICMSValue':
            model.energySCEEWithoutICMSValue = parseFloat(
                value.replace(/\./g, '').replace(',', '.'),
            )
            break
        case 'energyCompensatedGDQtd':
            model.energyCompensatedGDQtd = parseInt(value.replace(/\./g, ''))
            break
        case 'energyCompensatedGDValue':
            model.energyCompensatedGDValue = parseFloat(
                value.replace(/\./g, '').replace(',', '.'),
            )
            break
        case 'municipalPublicLightingContribution':
            model.municipalPublicLightingContribution = parseFloat(
                value.replace(/\./g, '').replace(',', '.'),
            )
            break
        default:
            break
    }
}

/**
 * Parâmetros para obter os dados
 */
const extractEnergyBillParams: IExtractEnergyBillFieldProps = {
    clientNumber: {
        searchTerm: 'Nº DO CLIENTE',
        rowRef: 1,
        positionRef: 0,
    },
    instalationCode: {
        searchTerm: 'Nº DA INSTALAÇÃO',
        rowRef: 1,
        positionRef: 1,
    },
    refMonth: {
        searchTerm: 'Referente a',
        rowRef: 1,
        positionRef: 0,
    },
    electricalEnergyQtd: {
        searchTerm: 'Energia ElétricakWh',
        rowRef: 0,
        positionRef: 2,
    },
    electricalEnergyValue: {
        searchTerm: 'Energia ElétricakWh',
        rowRef: 0,
        positionRef: 4,
    },
    energySCEEWithoutICMSQtd: {
        searchTerm: 'Energia SCEE s/ ICMSkWh',
        rowRef: 0,
        positionRef: 4,
    },
    energySCEEWithoutICMSValue: {
        searchTerm: 'Energia SCEE s/ ICMSkWh',
        rowRef: 0,
        positionRef: 6,
    },
    energyCompensatedGDQtd: {
        searchTerm: 'Energia compensada GD IkWh',
        rowRef: 0,
        positionRef: 4,
    },
    energyCompensatedGDValue: {
        searchTerm: 'Energia compensada GD IkWh',
        rowRef: 0,
        positionRef: 6,
    },
    municipalPublicLightingContribution: {
        searchTerm: 'Contrib Ilum Publica Municipal',
        rowRef: 0,
        positionRef: 4,
    },
}
