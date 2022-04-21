'use strict';

const { Product, Order, User } = require('../models');
const { sumPrice, priceToRupiah } = require('../helpers/formatter')

class ControllerOrder {

  static orderList(req, res) {
    Order.findAll({
      where: {
        UserId: req.session.UserId,
      },
      include: [
        {model: Product , as: 'ProductOrder' },
        {model: User, as: `UserOrder`}
      ]
    })
      .then(order => {
        let totalPrice = order.map(el => {
          if (el.status === 'Unpaid'){
            return el.ProductOrder.dataValues.price
          } else {
            return 0
          } 
          
        }) 
        totalPrice = sumPrice(totalPrice)
        res.render('orderList', { order, priceToRupiah, totalPrice })
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
  }

  static checkout(req, res) {

    Order.update({
      status: 'Paid'
    },{
      where: {
        UserId: req.session.UserId
      }
    })
      .then(() => {
        res.redirect('/')
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
  }

  static cancelOrder(req, res) {

    
    Order.destroy({
      where : {
        UserId : req.session.UserId
      }
    })
    .then(() => {
      res.redirect('/products')
    })
    .catch(err => {
      console.log(err);
      res.send(err)
    })
  }


}

module.exports = ControllerOrder