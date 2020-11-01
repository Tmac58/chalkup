'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      return queryInterface.addColumn(
        'UserRoutes',
        'userId',
        Sequelize.INTEGER
      )
  },

  down: async (queryInterface, Sequelize) => {
    
    return queryInterface.removeColumn(
      'UserRoutes',
      'userId'
    )
  }
};
