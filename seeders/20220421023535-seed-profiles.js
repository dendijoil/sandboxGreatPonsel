'use strict';

const fs = require('fs')

module.exports = {
  up (queryInterface, Sequelize) {
    const profiles = JSON.parse(fs.readFileSync('./data/profile.json', 'utf8')).map(el => {
      let data = el
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return data
    })
    return queryInterface.bulkInsert('Profiles', profiles)
  },

  down (queryInterface, Sequelize) {
     return queryInterface.bulkDelete('Profiles', null)
  }
};
