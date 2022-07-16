const express = require('express')
const Chat = require('../controllers/Chat.controller')
const router = express.Router()

// Get message của tài khoản
router.get('/message', Chat.checkRoom, Chat.getMessage) 

module.exports = router