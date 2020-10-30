'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  session.init({
    user_id: DataTypes.INTEGER,
    gym_id: DataTypes.INTEGER,
    time: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'session',
  });
  return session;
};