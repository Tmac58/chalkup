'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    return queryInterface.addConstraint(
      'UserSessions',
      {
        type: 'FOREIGN KEY',
        fields: ['userId'],
        name: 'userid-fk-in-sessions',
        references: {
          table: 'Users',
          field: 'id'
        }
      }
    )

  },

  down: async (queryInterface, Sequelize) => {
    
    return queryInterface.removeConstraint(
      'UserSessions',
      'userid-fk-in-sessions'
    )

  }
};
