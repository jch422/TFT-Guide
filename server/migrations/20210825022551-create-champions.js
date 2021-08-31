'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Champion', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey : true,
        type: Sequelize.INTEGER
      },
      name: {
        type:Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Champion');
  }
};  