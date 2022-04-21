'use strict';

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Orders', 'ProductId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Products'
        },
        key: 'id'
      }
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Orders', 'ProductId')
  }
};
