const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const Response = require('../controllers/Response.controller')
const router = express.Router()

// Middleware check token is exist
router.use(verifyToken)

// Get list response
router.get('/listResponse', Response.getListResponse)

// Quantity response in mail response
router.get('/quantityListResponse', Response.getQuantityListResponse)

// Post user accepted into list friend
router.post('/acceptRequestUser', Response.acceptRequestUser)

// Delete request sender in mail request
router.delete('/refuseRequestUser', Response.refuseRequestUser)

// Post accepted Group To User
router.post('/acceptRequestGroupToUser', Response.acceptRequestGroupToUser)

// Delete request sender in mail request
router.delete('/refuseRequestGroupToUser', Response.refuseRequestGroupToUser)

// Post accepted User To Group
router.post('/acceptRequestUserToGroup', Response.acceptRequestUserToGroup)

// Delete request sender in mail request
router.delete('/refuseRequestUserToGroup', Response.refuseRequestUserToGroup)

module.exports = router