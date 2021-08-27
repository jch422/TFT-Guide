"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class decks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  decks.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      user_id: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      underscored: true,
      modelName: "decks",
    }
  );
  return decks;
};
