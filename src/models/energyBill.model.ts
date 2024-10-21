import sequelize from '@config/database/database'
import { Model, DataTypes } from 'sequelize'

export class EnergyBill extends Model {
    id: number

    /**
     * Número do cliente
     */
    clientNumber: number

    /**
     * Código de instalação
     */
    instalationCode: number

    /**
     * Mês de referência
     */
    refMonth: string

    /**
     * Energia elétrica - Quantidade
     */
    electricalEnergyQtd: number

    /**
     * Energia elétrica - Valor
     */
    electricalEnergyValue: number

    /**
     * Energia SCEE s/ ICMS - Quantidade
     */
    energySCEEWithoutICMSQtd: number

    /**
     * Energia SCEE s/ ICMS - Valor
     */
    energySCEEWithoutICMSValue: number

    /**
     * Energia compensada GD I - Quantidade
     */
    energyCompensatedGDQtd: number

    /**
     * Energia compensada GD I - Valor
     */
    energyCompensatedGDValue: number

    /**
     * Contrib Ilum Publica Municipal
     */
    municipalPublicLightingContribution: number

    /** Consumo de energia elétrica */
    energyUsage: number

    /**
     * Valor total sem GD
     */
    totalValueWithouGD: number

    /**
     * Diretório da fatura
     */
    invoicePath: string
}

EnergyBill.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        clientNumber: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: 'client_number',
        },
        instalationCode: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: 'instalation_code',
        },
        refMonth: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'ref_month',
        },
        electricalEnergyQtd: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'electrical_energy_qtd',
        },
        electricalEnergyValue: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            field: 'electrical_energy_value',
        },
        energySCEEWithoutICMSQtd: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'energy_scee_without_icms_qtd',
        },
        energySCEEWithoutICMSValue: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            field: 'energy_scee_without_icms_value',
        },
        energyCompensatedGDQtd: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'energy_compensated_gd_qtd',
        },
        energyCompensatedGDValue: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            field: 'energy_compensated_gd_value',
        },
        municipalPublicLightingContribution: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            field: 'municipal_public_lighting_contribution',
        },
        energyUsage: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'energy_usage',
        },
        totalValueWithouGD: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            field: 'total_value_withou_gd',
        },
        invoicePath: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'invoice_path',
        },
    },
    {
        timestamps: false,
        sequelize,
        tableName: 'energy_bill',
    },
)
