'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.belongsTo(models.Brand)
      this.belongsToMany(models.User, { through: 'Orders', foreignKey: 'ProductId' })
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please input product name'
        },
        notEmpty: {
          msg: 'Please input product name'
        }
      }
    },
    storage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please input storage capacity'
        },
        notEmpty: {
          msg: 'Please input storage capacity'
        },
        isInt: {
          msg: 'Storage must be Integer'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please input product price'
        },
        notEmpty: {
          msg: 'Please input product price'
        },
        isInt: {
          msg: 'Price must be Integer'
        },
        min: {
          args: [500000],
          msg: 'Price must be more than 500,000'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please input Stock'
        },
        notEmpty: {
          msg: 'Please input Stock'
        },
        isInt: {
          msg: 'Stock must be Integer'
        },
        min: {
          args: [0],
          msg: 'Stock must be more than 0'
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please input product image'
        },
        notEmpty: {
          msg: 'Please input product image'
        }
      }
    },
    BrandId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};