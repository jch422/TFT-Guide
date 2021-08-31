'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deck_Champion extends Model {
    static associate(models) {
      this.belongsTo(models.Deck, {
        foreignKey: 'deckId',
        as: 'Deck',
      });
      this.belongsTo(models.Champion, {
        foreignKey: 'championId',
        as: 'Champion',
      });
    }
  }
  Deck_Champion.init(
    {
      deckId: DataTypes.INTEGER,
      championId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Deck_Champion',
    },
  );
  return Deck_Champion;
};
