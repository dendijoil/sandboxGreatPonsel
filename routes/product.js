'use strict'

const express = require('express')
const routerProduct = express.Router()
const ControllerProduct = require('../controllers/controllerProduct');

routerProduct.get('/', ControllerProduct.list)

routerProduct.get('/add', ControllerProduct.get)

routerProduct.post('/add', ControllerProduct.post)

routerProduct.get('/emptyStock' , ControllerProduct.emptyStock)

routerProduct.get('/restock/:id' , ControllerProduct.restock)

routerProduct.post('/restock/:id', ControllerProduct.postRestock)

routerProduct.get('/buy/:id', ControllerProduct.buy)

module.exports = routerProduct
