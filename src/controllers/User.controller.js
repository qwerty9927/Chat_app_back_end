const UserModel = require('../models/User.model')
class User {
  checkInfo(){
    if (typeof req.body.Name === 'undefined' || req.body.Name === "" || !/^[a-zvxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđA-Z0-9]{1,20}$/.test(req.body.Name)) {
      res.sendStatus(401)
      console.log(4)
      return false
    }
    next()
  }

  async addUser(req, res){
    if (await UserModel.createUser(userInfo)) {
      res.stauts(200).send("Success")
    }else {
      res.status(500)
    }
  }

  async getAll(req, res){
    const result = await UserModel.getAllUser()
    if(result.status){
      res.status(200).json(result.res)
    } else {
      res.status(500).send(result.res)
    }
  }
}

module.exports = new User()