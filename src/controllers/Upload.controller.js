const createError = require('http-errors')

class Upload {
	saveImage(req, res, next) {
		const file = req.file
		if (!file) {
			next(createError.InternalServerError())
		} else {
			res.sendStatus(200)
		}
	}
}

module.exports = new Upload()