'use strict'

const express = require('express')
const routerProfile = express.Router()
const ControllerProfile = require('../controllers/controllerProfile');

routerProfile.get('/', ControllerProfile.detail)

routerProfile.get('/edit', ControllerProfile.get)

routerProfile.post('/edit', ControllerProfile.post)

module.exports = routerProfile