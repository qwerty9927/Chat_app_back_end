const express = require('express')
const multer = require('multer')
const Upload = require('../controllers/Upload.controller')
const verifyToken = require('../middleware/verifyToken')
const router = express.Router()

// Middleware check token is exist
// router.use(verifyToken) 

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, `${__public}\\uploads\\media\\users\\${req.username}`)
	},
	filename: (req, file, cb) => {
		const filename = Date.now() + '-' + Math.round(Math.random() * 1E9)  + '-' + file.originalname
		req.fileName = filename
		cb(null, filename)
	}
})

const upload = multer({ storage })

router.get('/', function(req, res, next) {
	res.sendFile(__basedir + "/index.html")
})

// Upload image
router.post('/uploadImage', upload.single('image'), Upload.saveImage)

module.exports = router


