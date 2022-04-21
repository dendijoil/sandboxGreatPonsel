'use strict'

const express = require('express')
const router = express.Router()
const routerProduct = require('./product')
const routerProfile = require('./profile')
const routerOrder = require('./order');
const ControllerHome = require('../controllers/controllerHome');

router.get('/', ControllerHome.landingPage)

router.use('/products', routerProduct)

router.use('/profile', routerProfile)

router.use('/order', routerOrder)

module.exports = router