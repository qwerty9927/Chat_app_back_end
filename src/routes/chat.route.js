const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const Chat = require('../controllers/Chat.controller')
const router = express.Router()

//middleware check token is exist
router.use(verifyToken) 

// Get message của tài khoản
router.get('/message', Chat.checkRoom, Chat.getMessage) 

module.exports = router