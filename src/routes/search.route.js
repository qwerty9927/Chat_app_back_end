const express = require('express')
const router = express.Router()
const Search = require('../controllers/Search.controller')

// Tìm kiếm row có thỏa search value và lấy theo số lượng yêu cầu
router.get('/friend', Search.searchUserToChat)
router.get('/addUser', Search.searchUserToAdd)
router.get('/request', Search.searchUserInRequestBox)

module.exports = router
