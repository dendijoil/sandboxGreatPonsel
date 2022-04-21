'use strict'
const { User, Product, Order, Profile, Brand } = require('../models')

class ControllerHome {

  static landingPage(req, res){
    const { UserId, role } = req.session
    User.findByPk(UserId, {
      include: Profile
    })
    .then(user => {
      res.render('landingPage', { user })    
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    })
  }
}

module.exports = ControllerHome
