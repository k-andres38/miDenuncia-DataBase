'use strict';


module.exports = {
  up: async (queryInterface, Sequelize)=> {
   
    await queryInterface.bulkInsert('documents', [
          {
            id:1097781555,
          type:'cc',
          
          place_dispatch:'elkennedy',
          createdAt:new Date() ,
          updatedAt:new Date()
            

          },
          {
            id:1525963254,
            type:'ti',
           
            place_dispatch:'lacumbre',
            createdAt:new Date() ,
            updatedAt:new Date()
              
      
            },
         {
          id:1602336666,
          type:'cc',
         
          place_dispatch:'elnorte',
          createdAt:new Date() ,
          updatedAt:new Date()
            
    
           }  
      
      ], {});
    
  },

down:  async  (queryInterface, Sequelize)=> {
   

    await queryInterface.bulkDelete('documents', null, {});
  }

};