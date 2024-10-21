import fs from 'fs'

import { Result } from 'pdf-parse'

import pdfParse from 'pdf-parse'

export const extractPdfData = async (pdfFilePath: string): Promise<Result> => {
    const buffer = fs.readFileSync(pdfFilePath)

    try {
        const pdfParsed = await pdfParse(buffer)

        return pdfParsed
    } catch (error) {
        throw error
    }
}
