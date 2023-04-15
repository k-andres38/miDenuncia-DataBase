'use strict'

module.exports={
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('comments',[
            {
                date: new Date(),
                description:'Es cierto ese semaforo no funciona bien ',
                status:1,
              
                user_id:1,
                request_id:1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                date: new Date(),
                description:'que lo cambien, ese semaforo no funciona  ',
                status:1,
              
                user_id:1,
                request_id:1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                date: new Date(),
                description:'cada vez que llueve se daña',
                status:1,

              
                user_id:2,
                request_id:2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                date: new Date(),
                description:'andar en moto por aqui es muy complicado',
                status:2,
              
                user_id:3,
                request_id:2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                date: new Date(),
                description:'andar en moto por aqui es muy complicado',
                status:2,
              
                user_id:3,
                request_id:1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                date: new Date(),
                description:'andar en moto por aqui es muy complicado',
                status:2,
              
                user_id:3,
                request_id:1,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                date: new Date(),
                description:'andar en moto por aqui es muy complicado',
                status:2,
              
                user_id:3,
                request_id:1,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                date: new Date(),
                description:'andar en moto por aqui es muy complicado',
                status:2,
              
                user_id:3,
                request_id:2,
                createdAt: new Date(),
                updatedAt: new Date()
            },





        ],{});

    },  
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('comments',null,{});
    }
}