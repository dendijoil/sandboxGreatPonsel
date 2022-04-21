'use strict';

const { Product, User, Profile, Brand, Order } = require('../models');

class Controller {
  static home(req, res) {
    User.findAll({
      include: {
        model: Product, include: {
          model: Brand
        }
      }
    })
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
  }
}

module.exports = Controller;
