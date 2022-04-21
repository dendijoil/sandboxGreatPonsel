'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Orders', 'UserId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      }
    })
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Orders', 'UserId')
  }
};
