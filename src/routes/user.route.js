const express = require('express')
const User = require('../controllers/User.controller')
const router = express.Router()

router.post('/addUser', User.checkInfo, User.addUser)
router.get('/getAll', User.getAll)

module.exports = router
