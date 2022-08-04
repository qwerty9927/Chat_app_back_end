const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const User = require('../controllers/User.controller')
const router = express.Router()

// Middleware check token is exist
router.use(verifyToken) 

// Get list friend
router.get('/listFriend', User.getListFriend)

// Quantity friend in list friend
router.get('/quantityListFriend', User.getQuantityListFriend)

module.exports = router
