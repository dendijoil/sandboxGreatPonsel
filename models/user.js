'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      this.hasOne(models.Profile)
      this.belongsToMany(models.Product, { through: 'Orders', foreignKey: 'UserId' })
      this.hasMany(models.Order, { foreignKey: 'UserId', as: 'UserOrder' })
      // Users.belongsToMany(models.Places, { through: 'Checkins', as: 'Checkins' })
      // User.belongsToMany(User, {
      //   through: models.Order,
      //   as: 'UserOrder',  // <--- unique alias name
      //   foreignKey: 'UserId',
      // });
    }

    static gender = [
      "male", "female"
    ]

    static role = [
      "admin", "user"
    ]

  }

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please input your username'
        },
        len: {
          args: [4, 15],
          msg: 'Username must be between 4 and 15'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please input your email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please input your password'
        },
        len: {
          args: [4, 15],
          msg: 'Password must be between 4 and 15'
        }
      }
    },
    role: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate(instance, options) {
        const salt = bcrypt.genSaltSync(7);
        const hash = bcrypt.hashSync(instance.password, salt);

        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User'
  });
  return User;
};