'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class decks_champions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association heres
  
    }
  };
  decks_champions.init({
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
    modelName: 'decks_champions',
  });
  return decks_champions;
};