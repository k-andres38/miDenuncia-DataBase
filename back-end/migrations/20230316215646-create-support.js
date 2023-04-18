'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('supports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      request_id: {
        type: Sequelize.INTEGER(5),
        references: {
          model:'requests',
          key:'id'
        }
      },
      user_id: {
        type: Sequelize.INTEGER(5),
        references: {
          model:'users',
          key:'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
   
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('supports');
  }
};