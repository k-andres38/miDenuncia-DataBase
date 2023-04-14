'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('types_requests', [
            {
                name: 'Seguridad',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Malla Vial',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Señalización Vial',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Espacios Públicos',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Alumbrado Público',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Contaminacion Ambiental',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },
    down : async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('types_requests', null, {});
    }
}