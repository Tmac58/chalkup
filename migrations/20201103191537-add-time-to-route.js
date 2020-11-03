'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'UserRoutes',
      'totalSeconds',
      Sequelize.INTEGER
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'UserRoutes',
      'totalSeconds'
    )
  }
};
