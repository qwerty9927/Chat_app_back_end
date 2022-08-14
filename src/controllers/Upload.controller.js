const createError = require('http-errors')
const UploadModel = require('../models/Upload.model')
class Upload {
	async saveImage(req, res, next) {
		const file = req.file
		if (!file) {
			next(createError.InternalServerError())
		} else {
			try{
				await UploadModel.setNameImageForUser(req.username, req.fileName)
				res.sendStatus(200)
			} catch(e){
				next(createError.InternalServerError())
			}
		}
	}
}

module.exports = new Upload()