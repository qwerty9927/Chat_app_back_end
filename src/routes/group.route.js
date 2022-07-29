const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const Group = require('../controllers/Group.controller')
const router = express.Router()

//middleware check token is exist
router.use(verifyToken)

// Route create group
router.post('/createGroup', Group.createGroup)

module.exports = router
