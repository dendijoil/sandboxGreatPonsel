'use strict';

const fs = require('fs');

module.exports = {
  up (queryInterface, Sequelize) {
    const brands = JSON.parse(fs.readFileSync('./data/brand.json', 'utf-8')).map(el => {
      let data = el
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return data
    })
    return queryInterface.bulkInsert('Brands', brands)
  },

  down (queryInterface, Sequelize) {
     return queryInterface.bulkDelete('Brands', null)
  }
};
