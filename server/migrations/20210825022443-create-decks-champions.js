'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('decks_champions', {
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
    await queryInterface.dropTable('decks_champions');
  }
};