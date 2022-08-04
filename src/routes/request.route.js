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
router.post('/sendRequestUser', Request.sendRequestUser)

// Send invitation to friend 
router.post('/sendInvitationGroup', Request.sendInvitationGroup)

// Send request to group
router.post('/sendRequestToGroup', Request.sendRequestToGroup)

module.exports = router
