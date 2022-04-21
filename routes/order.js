'use strict'

const express = require('express')
const routerOrder = express.Router()
const ControllerOrder = require('../controllers/controllerOrder');

routerOrder.get('/', ControllerOrder.orderList)

routerOrder.get('/checkout', ControllerOrder.checkout)

routerOrder.get('/cancel', ControllerOrder.cancelOrder)

module.exports = routerOrder