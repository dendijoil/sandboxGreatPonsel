'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "UserId" , as : 'UserOrder' })
      this.belongsTo(models.Product, { foreignKey: "ProductId" , as : 'ProductOrder' })
    }
  }
  Order.init({
    status: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
    hooks: {
      beforeCreate(instance, options){
        instance.status = 'Unpaid'
      }
    }
  });
  return Order;
};