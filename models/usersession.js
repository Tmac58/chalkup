'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserSession.init({
    userId: DataTypes.INTEGER,
    gymId: DataTypes.INTEGER,
    climbs: DataTypes.INTEGER,
    time: DataTypes.INTEGER,
    totalSeconds: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserSession',
  });
  return UserSession;
};