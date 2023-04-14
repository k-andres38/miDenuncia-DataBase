'use strict'
module.exports={
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('types_reports',[
            {
                name:'Ya se coluciono el Problema',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name:'Racismo',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name:'Vulnera algun derecho',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name:'Abuso verbal',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name:'Contenido explicito',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name:'Expresión de odio',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name:'Denuncia falsa',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ],{});
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('types_report',null,{});
    }
}