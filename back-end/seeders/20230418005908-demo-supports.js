'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example: */
      await queryInterface.bulkInsert('supports', [
        {
          request_id:1,
          user_id:1,
          createdAt: new Date(),
         
        }, {
          request_id:1,
          user_id:1,
          createdAt: new Date(),
         
        }, {
          request_id:1,
          user_id:1,
          createdAt: new Date(),
         
        }, {
          request_id:1,
          user_id:1,
          createdAt: new Date(),
         
        }, {
          request_id:1,
          user_id:1,
          createdAt: new Date(),
         
        },
        ], {});
   
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
