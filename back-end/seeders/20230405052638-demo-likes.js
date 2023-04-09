'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('likes', [
            {
       
              like:5,
              user_id:1,
              


              
            },
            {
  
              
              like:4,
              user_id:2,
             

        
            },
            {
              
              like:2,
              user_id:3,
            
  

            },
            {
              
              like:1,
              user_id:3,
            
               

       
            }
        ], {});
    },
    down : async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('likes', null, {});
    }
}