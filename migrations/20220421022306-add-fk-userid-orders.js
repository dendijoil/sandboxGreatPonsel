'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Orders', 'UserId', {
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
    return queryInterface.removeColumn('Orders', 'UserId')
  }
};
