'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Profiles', 'UserId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      }
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Profiles', 'UserId')
  }
};
