'use strict';

const fs = require('fs')

module.exports = {
  up (queryInterface, Sequelize) {
    const orders = JSON.parse(fs.readFileSync('./data/order.json', 'utf8')).map(el => {
      let data = el
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return data
    })
    return queryInterface.bulkInsert('Orders', orders)
  },

  down (queryInterface, Sequelize) {
     return queryInterface.bulkDelete('Orders', null)
  }
};
