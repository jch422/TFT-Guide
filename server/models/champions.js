"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class champions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    staticassociate(models) {
      // define association here
    }
  }
  champions.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      underscored: true,
      modelName: "champions",
    }
  );
  return champions;
};
