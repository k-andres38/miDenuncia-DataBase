'use strict'

module.exports={
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('requests',[
            {
                date: new Date(),
                location: 'Calle 1 carrera 1',
                neighborhood:'Centro',
                subject:'El servicio del semaforo no funciona',
                problem:'El servicio del semaforo no funciona',
                solution:'Se debe cambiar el semaforo',
                support:100,
                status:1,
                tag:2,
                type_request_id:1,
                user_id:1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                date: new Date(),
                location: 'Calle 1 carrera 1',
                neighborhood:'Centro',
                subject:'carretera en mal estado',
                problem:'Carretera  en mal estado',
                solution:'mejorar carretera',
                support:204,
                status:1,
                tag:2,
                type_request_id:1,
                user_id:1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                date: new Date(),
                location: 'Calle 1 carrera 1',
                neighborhood:'Centro',
                subject:'Solicitud de servicio',
                problem:'El servicio del semaforo no funciona',
                solution:'Se debe cambiar el semaforo',
                support:301,
                status:1,
                tag:2,
                type_request_id:1,
                user_id:1,
                createdAt: new Date(),
                updatedAt: new Date()
            }
          
         
          
        ],{});
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('request',null,{});
    }
}