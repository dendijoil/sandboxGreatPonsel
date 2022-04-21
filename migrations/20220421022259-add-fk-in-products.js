'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Products', 'BrandId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: 'Brands'
        },
        key: 'id'
      }
    })
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Products', 'BrandId')
  }
};
