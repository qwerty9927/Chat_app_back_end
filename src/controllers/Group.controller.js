const createError = require('http-errors')
const GroupModel = require('../models/Group.model')
const UserModel = require('../models/User.model')

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

  async postRequest(req, res, next){
    const data = req.body
    // Bảo vệ route xác thực đúng username
    data.myself.Username = req.username
    try {
      //post into request log of main user
      await UserModel.addRequestToLog(data.myself.Username, data.friend.Username)
      //post into user purpose
      await UserModel.addRequestToFriend(data.myself, data.friend.Username)
    } catch(e){
      console.log(e)
      next(createError.InternalServerError())
    }
  }

  async acceptGroup(req, res, next){
    // const data = req.body
    // // Bảo vệ route xác thực đúng username
    // data.mySelf.Username = req.username
    // try{
    //   await UserModel.addFriendToMyListFriend(data.mySelf.Username, data.friend, idRoom)
    //   await UserModel.addFriendToYourListFriend(data.mySelf, data.friend.Username, idRoom)
    //   await UserModel.deleteRequestLogOfFriend(data.mySelf.Username, data.friend.Username)
    //   await UserModel.deleteMailRequestOfUser(data.mySelf.Username, data.friend.Username)
    //   await UserModel.createRoom(idRoom)
    //   res.sendStatus(200)
    // } catch(e){
    //   next(createError.InternalServerError())
    // }
  }

}

module.exports = new Group()