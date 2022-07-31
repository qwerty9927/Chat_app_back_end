const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const Group = require('../controllers/Group.controller')
const router = express.Router()

// Middleware check token is exist
router.use(verifyToken)

// Route create group
router.post('/createGroup', Group.createGroup)

// Route send request to user
router.post('/sendRequest', Group.postRequest)

// Route accept request receive
router.post('/acceptGroup', Group.acceptGroup)

// Route refuse request receive
router.post('/acceptGroup', Group.acceptGroup)

// Route add user to group
// router.post('/addUserGroup', Group.addUserGroup)



module.exports = router
