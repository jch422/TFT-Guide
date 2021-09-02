'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deck extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      this.belongsToMany(models.Champion, {
        foreignKey: 'deckId',
        through: 'Deck_Champion',
        as: 'Champion',
      });
    }
  }
  Deck.init(
    {
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Deck',
    },
  );
  return Deck;
};
