'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasOne(models.Profile)
      this.belongsToMany(models.Product, { through: 'Orders', foreignKey: 'UserId' })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please input your username'
        },
        notEmpty: {
          msg: 'Please input your username'
        },
        min: {
          args: [4],
          msg: 'username must be more than 4 character'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please input your email'
        },
        notEmpty: {
          msg: 'Please input your email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please input your password'
        },
        notEmpty: {
          msg: 'Please input your password'
        },
        min: {
          args: [4],
          msg: 'password must be more than 4 character'
        }
      }
    },
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User'
  });
  return User;
};