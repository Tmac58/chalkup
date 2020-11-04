'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gymlocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  gymlocation.init({
    gym_name: DataTypes.STRING,
    address: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    reviews: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'gymlocation',
  });
  return gymlocation;
};