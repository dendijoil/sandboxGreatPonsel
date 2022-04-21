'use strict';

const { User } = require('../models')
const bcrypt = require('bcryptjs')

class Login {
  static get(req, res) {
    const errors = req.query.error
    console.log(req.query.error);
    res.render('login', { user: {}, errors: req.query.error })
  }

  static post(req, res) {
    const { username, password, role } = req.body

    User.findOne({
      where: { username }
    })
      .then(user => {
        if (user) {
          const isValidPassword = bcrypt.compareSync(password, user.password)

          if (isValidPassword) {
            req.session.UserId = user.id
            req.session.role = user.role
            return res.redirect('/')
          } else {
            const errors = `Invalid username or password`
            res.redirect(`/login?error=${errors}`)
          }
        }
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
  }

  static logout(req, res) {
    req.session.destroy(err => {
      if (err) {
        return res.send(err)
      }
      res.redirect('/login')
    })
  }
}

module.exports = Login