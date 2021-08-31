'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Deck_Champion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association heres
      this.belongsTo(models.Deck, {
        foreignKey: 'deckId',
        as: 'decks',
      });
      this.belongsTo(models.Champion, {
        foreignKey: 'championId',
        as: 'champion',
      });
    }
  };
  Deck_Champion.init({
    deck_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    champion_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'Deck_Champion',
  });
  return Deck_Champion;
};