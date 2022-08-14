const DB = require('./DB.model')
class UploadModel extends DB {
	async setNameImageForUser(username, nameImage) {
		const sql = `Update account set Image = "${nameImage}" where Username = "${username}"`
		try {
			await this.excuseQuery(sql)
		} catch (e) {
			console.log(e)
			throw e.message
		}
	}
}

module.exports = new UploadModel()