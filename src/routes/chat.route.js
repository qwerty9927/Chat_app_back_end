const express = require('express')
const Chat = require('../controllers/Chat.controller')
const router = express.Router()

router.get('/', Chat.chatPage)

module.exports = router