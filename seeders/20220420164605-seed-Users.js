'use strict';

const fs = require('fs')

module.exports = {
  up (queryInterface, Sequelize) {
    const users = JSON.parse(fs.readFileSync('./data/user.json', 'utf8')).map(el => {
      let data = el
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return data
    })
    return queryInterface.bulkInsert('Users', users)
  },

  down (queryInterface, Sequelize) {
     return queryInterface.bulkDelete('Users', null)
  }
};
