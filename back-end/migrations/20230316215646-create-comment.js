'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(5)
      },
      date: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.STRING(250)
      },
      status: {
        type: Sequelize.TINYINT(1)
      },
       user_id: {
       type: Sequelize.INTEGER(5),
       references:{
          model:'users',
          key:'id'
        }

      },
      request_id:{
        type: Sequelize.INTEGER(5),
        references:{

          model:'requests',
          key:'id'
          
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt:{
        allowNull: true,
        type:Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
  }
};