export interface IExtractEnergyBillPDFProps {
    searchTerm: string
    rowRef: number
    positionRef: number
}

export interface IExtractEnergyBillFieldProps {
    clientNumber: IExtractEnergyBillPDFProps
    instalationCode: IExtractEnergyBillPDFProps
    refMonth: IExtractEnergyBillPDFProps
    electricalEnergyQtd: IExtractEnergyBillPDFProps
    electricalEnergyValue: IExtractEnergyBillPDFProps
    energySCEEWithoutICMSQtd: IExtractEnergyBillPDFProps
    energySCEEWithoutICMSValue: IExtractEnergyBillPDFProps
    energyCompensatedGDQtd: IExtractEnergyBillPDFProps
    energyCompensatedGDValue: IExtractEnergyBillPDFProps
    municipalPublicLightingContribution: IExtractEnergyBillPDFProps
}
