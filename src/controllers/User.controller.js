const { v4: uuidv4 } = require('uuid')
const UserModel = require('../models/User.model')

class User {

  async getListRequest(req, res){
    const idCurrentUser = req.username
    const page = req.query.page
    const quantity = req.query.quantity
    try{
      const result = await UserModel.getRequest(idCurrentUser, page, quantity)
      res.status(200).json(result)
    } catch(e){
      console.log(e)
      res.sendStatus(500)
    }
  }

  async getQuantityListRequest(req, res){
    const idCurrentUser = req.username
    try{
      const result = await UserModel.getQuantityRequest(idCurrentUser)
      res.status(200).json(result)
    } catch(e){
      console.log(e)
      res.sendStatus(500)
    }
  }

  async getListFriend(req, res){
    const idCurrentUser = req.username
    const page = req.query.page
    const quantity = req.query.quantity
    if(idCurrentUser && quantity && page){
      try{
        const result = await UserModel.getFriend(idCurrentUser, page, quantity)
        res.status(200).json(result)
      } catch(e){
        console.log(e)
        res.sendStatus(500)
      }
    } else {
      res.sendStatus(422)
    }
  }

  async getQuantityListFriend(req, res){
    const idCurrentUser = req.username
    if(idCurrentUser){
      try{
        const result = await UserModel.getQuantityFriend(idCurrentUser)
        res.status(200).json(result)
      } catch(e){
        console.log(e)
        res.sendStatus(500)
      }
    } else {
      res.sendStatus(422)
    }
  }

  async postRequest(req, res){
    const data = req.body
    // Bảo vệ route xác thực đúng username
    data.mySelf.Username = req.username
    try{
      await UserModel.addRequestToFriend(data.mySelf, data.friend.Username)
      await UserModel.addRequestToLog(data.mySelf.Username, data.friend.Username)
      res.sendStatus(200)
    } catch(e){
      res.sendStatus(500)
    }
  }

  async addFriend(req, res){
    const data = req.body
    const idRoom = uuidv4().replace(/-/g, "")
    // Bảo vệ route xác thực đúng username
    data.mySelf.Username = req.username
    try{
      await UserModel.addFriendToMyListFriend(data.mySelf.Username, data.friend, idRoom)
      await UserModel.addFriendToYourListFriend(data.mySelf, data.friend.Username, idRoom)
      await UserModel.deleteRequestLogOfFriend(data.mySelf.Username, data.friend.Username)
      await UserModel.deleteMailRequestOfUser(data.mySelf.Username, data.friend.Username)
      await UserModel.createRoom(idRoom)
      res.sendStatus(200)
    } catch(e){
      res.sendStatus(500)
    }
  }

  async refuseRequest(req, res){
    const idCurrentUser = req.username
    const idRefuse = req.query.idRefuse
    try {
      await UserModel.deleteMailRequestOfUser(idCurrentUser, idRefuse)
      await UserModel.deleteRequestLogOfFriend(idCurrentUser, idRefuse)
      res.sendStatus(200)
    } catch(e){
      res.sendStatus(500)
    }
  }
}

module.exports = new User()
