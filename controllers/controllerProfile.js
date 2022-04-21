"use strict"

const { User , Profile } = require("../models")
const { formatingDateForForm } = require('../helpers/formatter')
class ControllerProfile {
  
  static detail(req, res){
    Profile.findOne({
      where : {
        UserId: req.session.UserId
      }
    })
    .then(profile => {
      let date = Profile.convertedDate(profile.dateOfBirth);
      res.render('userProfile', { profile , user: {} , date})
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    })
  }

  static get(req, res){
    Profile.findByPk(req.session.UserId)
    .then(profile => {
      console.log(profile);
      let gender = User.gender
      res.render('formEditProfile', { profile , formatingDateForForm , gender})
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    })
  }

  static post(req, res){
    const { name, dateOfBirth, phoneNumber, gender, photo } = req.body
    const data = { name, dateOfBirth, phoneNumber, gender, photo }
    console.log(data);
    Profile.update(data, {where: { id: req.session.UserId}})
    .then(() => {
      res.redirect('/profile')
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    })
  }
  
}

module.exports = ControllerProfile