'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint(
      'gymlocations',
      {
        type: 'FOREIGN KEY',
        fields: ['userId'],
        name: 'userid-fk-in-userroutes',
        references: {
          table: 'Users',
          field: 'id'
        }
      }
    )

  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'gymlocations',
      'userid-fk-in-userroutes'
    )

  }
};
