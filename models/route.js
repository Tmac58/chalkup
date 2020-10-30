'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  route.init({
    session_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    grade: DataTypes.STRING,
    attempts: DataTypes.INTEGER,
    style: DataTypes.ARRAY(DataTypes.STRING),
    color: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    sent: DataTypes.BOOLEAN,
    time: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'route',
  });
  return route;
};