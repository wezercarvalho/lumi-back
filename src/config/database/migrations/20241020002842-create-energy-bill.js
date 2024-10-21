'use strict'

const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable('energy_bill', {
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
        })
    },

    async down(queryInterface) {
        await queryInterface.dropTable('energy_bill')
    },
}
