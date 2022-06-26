const express = require('express')
const router = express.Router()
const Admin = require('../controllers/Admin.controller')

router.use(Admin.authorization) //middleWare prevent user login to admin
router.get('/', Admin.dashBoard) //dashBroad of admin

module.exports = router