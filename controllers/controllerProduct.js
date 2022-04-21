'use strict'

const { Product, Brand, Order } = require('../models')
const { priceToRupiah } = require('../helpers/formatter')
const { Op } = require('sequelize');
class ControllerProduct {

  static list(req, res) {
    const { name, brand } = req.query
    const search = {
      attribute: {
        exclude: ["createdAt", "updatedAt"]
      },
      where: {
        stock: {
          [Op.gt]: 0
        }
      },
      order: [['name', 'asc']]
    }

    if (name) {
      search.where = {
        name: { [Op.iLike]: `%${name}%` },
      }
    }

    if (brand) {
      search.where = {
        BrandId: brand,
      }
    }

    let phones;
    Product.findAll(search, { include: Brand })
      .then(result => {
        phones = result
        return Brand.findAll()
      })
      .then(brand => {
        let user = req.session.role
        res.render("productList", { phones, user, priceToRupiah, brand })
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
  }

  static get(req, res) {
    const { errors } = req.query
    Brand.findAll()
      .then(brand => {
        res.render('formAddPhone', { brand, errors })
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
  }

  static post(req, res) {
    const { name, storage, price, stock, image, BrandId } = req.body
    const body = { name, storage, price, stock, image, BrandId }
    Product.create(body)
      .then(() => {
        res.redirect('/products')
      })
      .catch(err => {
        let listError = []
        if (err.name === 'SequelizeValidationError') {
          err.errors.forEach(el => {
            listError.push(el.message)
          });
        }
        res.redirect(`/products/add?errors=${listError}`)
      })
  }

  static emptyStock(req, res) {

    Product.findAll({
      where: {
        stock: 0
      }
    })
      .then(product => {
        res.render("emptyProducts", { product })
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
  }

  static restock(req, res) {
    Product.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(phone => {
        res.render("formRestock", { phone })
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
  }

  static postRestock(req, res) {
    Product.update({ stock: req.body.stock }, {
      where: {
        id: req.params.id
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

  static buy(req, res) {

    Order.create({
      UserId: req.session.UserId,
      ProductId: req.params.id
    })
      .then(() => {
        Product.decrement('stock', {
          where: {
            id: req.params.id
          }
        })
      })
      .then(() => {
        res.redirect("/products")
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
  }
}

module.exports = ControllerProduct