const express = require('express')
const router = express.Router()
const Search = require('../controllers/Search.controller')
const verifyToken = require('../middleware/verifyToken')

//middleware check token is exist
router.use(verifyToken) 

// Tìm kiếm bạn thỏa search value
router.get('/friend', Search.searchUserToChat)

//Số lượng bạn thỏa search value
router.get('/quantityFriendFound', Search.quantityUserToChatFound)

// Tìm kiếm bạn mới thỏa search value
router.get('/addUser', Search.searchUserToAdd)

//Số lượng bạn mới thỏa search value
router.get('/quantityNewUserFound', Search.quantityUserToAddFound)

// Tìm kiếm thư yêu cầu thỏa search value
router.get('/request', Search.searchUserInRequestBox)

//Số lượng thư yêu cầu thỏa search value
router.get('/quantityRequestFound', Search.quantityRequestFound)

module.exports = router
