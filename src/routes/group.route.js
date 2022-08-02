const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const Group = require('../controllers/Group.controller')
const router = express.Router()

// Middleware check token is exist
router.use(verifyToken)

// Route create group
router.post('/createGroup', Group.createGroup)

// Get list group
router.get('/listGroup', Group.getListGroup)

// Quantity group in list group
router.get('/quantityListGroup', Group.getQuantityListGroup)

module.exports = router
