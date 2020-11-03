'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'UserSessions',
      'totalSeconds',
      Sequelize.INTEGER
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'UserSessions',
      'totalSeconds'
    )
  }
};
