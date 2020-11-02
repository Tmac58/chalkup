'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return queryInterface.addConstraint(
      'UserRoutes',
      {
        type: 'FOREIGN KEY',
        fields: ['sessionId'],
        name: 'sessionid-fk-in-userroutes',
        references: {
          table: 'UserSessions',
          field: 'id'
        }
      }
    )

  },

  down: async (queryInterface, Sequelize) => {
    
    return queryInterface.removeConstraint(
      'UserRoutes',
      'sessionid-fk-in-userroutes'
    )

  }
};
