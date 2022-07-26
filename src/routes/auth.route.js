const express = require('express')
const router = express.Router()
const Auth = require('../controllers/Auth.controller')

router.post('/login', Auth.login)
router.post('/resgister', Auth.authenticate, Auth.resgister)
router.get('/refreshToken', Auth.refreshToken)
router.get('/logout', Auth.logout)
module.exports = router
