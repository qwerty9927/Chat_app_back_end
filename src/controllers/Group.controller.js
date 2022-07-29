const GroupModel = require('../models/Group.model')

class Group {
  async createGroup(req, res, next) {
    const admin = req.username
    const name = req.body.Name
    const image = req.body.Image || "defaultImage.png"
    try {
      await GroupModel.createGroup(name, image, admin)
      res.sendStatus(200)
    } catch (e){
      console.log(e)
      next(e)
    }
  }

  // async addFriend(req, res, next){
  //   const 
  // }
}

module.exports = new Group()