const express = require('express')
const User = require('../controllers/User.controller')
const router = express.Router()

// Lấy danh sách bạn của tài khoản
router.get('/listFriend', User.getListFriend)

// Lấy danh sách request của tài khoản
router.get('/listRequest', User.getListRequest)

// Post request đến người dùng đích
router.post('/addRequest', User.postRequest)

// Post user accepted vào list friend
router.post('/addFriend', User.addFriend)

// Delete user đã gửi request ra mail request
router.delete('/refuseRequest', User.refuseRequest)

module.exports = router
