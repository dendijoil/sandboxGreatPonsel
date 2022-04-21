'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      this.belongsTo(models.User)
    }

    get age() {
      let now = new Date().getFullYear()
      let born = new Date(this.dateOfBirth).getFullYear();
      return now - born
    }

    static convertedDate(value) {
      const date = new Date(value)
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('id-ID', options)
    }

    get newDate() {
      let ndate = new Date(this.dateOfBirth).toISOString().split('T')[0]
      return ndate
    }
  }
  Profile.init({
    name: {
      type: DataTypes.STRING,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    photo: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    } 
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};