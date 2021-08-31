'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Deck_Champion', {
      deck_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      champion_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Deck_Champion');
  }
};