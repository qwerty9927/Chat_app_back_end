const express = require('express')
const router = express.Router()
const Auth = require('../controllers/Auth.controller')

// Login 
router.post('/login', Auth.login)

// Register
router.post('/resgister', Auth.authenticate, Auth.resgister)

// RefreshToken
router.get('/refreshToken', Auth.refreshToken)

// Logout
router.get('/logout', Auth.logout)
module.exports = router
