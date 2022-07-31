const express = require('express')
const router = express.Router()
const Request = require('../controllers/Request.controller')
const verifyToken = require('../middleware/verifyToken')

// Middleware check token is exist
router.use(verifyToken) 

// Get list request
router.get('/listRequest', Request.getListRequest)

// Quantity request in list request
router.get('/quantityListRequest', Request.getQuantityListRequest)

// Send request to purpose user
router.post('/sendRequest', Request.sendRequest)

// Post user accepted into list friend
router.post('/acceptRequest', Request.acceptRequest)

// Delete request sender in mail request
router.delete('/refuseRequest', Request.refuseRequest)

module.exports = router
