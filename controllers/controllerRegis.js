'use strict';
const { User , Profile } = require("../models")

class Register {

  static get(req, res){
    const {errors} = req.query
    let gender = User.gender
    let role = User.role
    res.render('register', {
      errors, gender, role
    })
  }

  static post(req, res){
    const { username, email, password, role, name, dateOfBirth, phoneNumber, gender, photo } = req.body;
    User.create({ username, email, password, role })
    .then(user => {
      console.log(user);
      return Profile.create({ name, dateOfBirth, phoneNumber, gender, photo, UserId: user.dataValues.id })
    })
    .then(() => {
      res.redirect('/login')
    })
    .catch(err => {
      let listError = []
      if (err.name === 'SequelizeValidationError'){
        err.errors.forEach(el => {
          listError.push(el.message)
        })
      }
      res.redirect(`/register?errors=${listError}`)
    })
  }
}

module.exports = Register