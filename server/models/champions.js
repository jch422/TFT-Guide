'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class champions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` fㄴile will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  champions.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'champions',
    },
  );
  return champions;
};
