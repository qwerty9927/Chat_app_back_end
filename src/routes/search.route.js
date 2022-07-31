const express = require('express')
const router = express.Router()
const Search = require('../controllers/Search.controller')
const verifyToken = require('../middleware/verifyToken')

// Middleware check token is exist
router.use(verifyToken) 

// Search friend in list friend
router.get('/friend', Search.searchFriendToChat)

// Quantity friend found in list friend
router.get('/quantityFriendFound', Search.quantityFriendToChat)

// Search user in account
router.get('/searchUser', Search.searchUserToAdd)

// Quantity user found in account
router.get('/quantityUserFound', Search.quantityUserToAdd)

// Search request in mail request
router.get('/request', Search.searchRequest)

// Quantity request found in main request
router.get('/quantityRequestFound', Search.quantityRequestFound)

module.exports = router
