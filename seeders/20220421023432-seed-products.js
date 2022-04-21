'use strict';

const fs = require('fs')

module.exports = {
  up (queryInterface, Sequelize) {
    const products = JSON.parse(fs.readFileSync('./data/product.json', 'utf8')).map(el => {
      let data = el
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return data
    })
    return queryInterface.bulkInsert('Products', products)
  },

  down (queryInterface, Sequelize) {
     return queryInterface.bulkDelete('Products', null)
  }
};
