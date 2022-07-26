const { v4: uuidv4 } = require('uuid')
const createError = require('http-errors')
const UserModel = require('../models/User.model')

class User {

  async getListRequest(req, res, next){
    const idCurrentUser = req.username
    const page = req.query.page
    const quantity = req.query.quantity
    try{
      const result = await UserModel.getRequest(idCurrentUser, page, quantity)
      res.status(200).json(result)
    } catch(e){
      console.log(e)
      next(createError.InternalServerError())
    }
  }

  async getQuantityListRequest(req, res, next){
    const idCurrentUser = req.username
    try{
      const result = await UserModel.getQuantityRequest(idCurrentUser)
      res.status(200).json(result)
    } catch(e){
      console.log(e)
      next(createError.InternalServerError())
    }
  }

  async getListFriend(req, res, next){
    const idCurrentUser = req.username
    const page = req.query.page
    const quantity = req.query.quantity
    if(idCurrentUser && quantity && page){
      try{
        const result = await UserModel.getFriend(idCurrentUser, page, quantity)
        res.status(200).json(result)
      } catch(e){
        console.log(e)
        next(createError.InternalServerError())
      }
    } else {
      next(createError.InternalServerError())
    }
  }

  async getQuantityListFriend(req, res, next){
    const idCurrentUser = req.username
    if(idCurrentUser){
      try{
        const result = await UserModel.getQuantityFriend(idCurrentUser)
        res.status(200).json(result)
      } catch(e){
        console.log(e)
        next(createError.InternalServerError())
      }
    } else {
      next(createError.UnprocessableEntity())
    }
  }

  async postRequest(req, res, next){
    const data = req.body
    // Bảo vệ route xác thực đúng username
    data.mySelf.Username = req.username
    try{
      await UserModel.addRequestToFriend(data.mySelf, data.friend.Username)
      await UserModel.addRequestToLog(data.mySelf.Username, data.friend.Username)
      res.sendStatus(200)
    } catch(e){
      next(createError.InternalServerError())
    }
  }

  async addFriend(req, res, next){
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
      next(createError.InternalServerError())
    }
  }

  async refuseRequest(req, res, next){
    const idCurrentUser = req.username
    const idRefuse = req.query.idRefuse
    try {
      await UserModel.deleteMailRequestOfUser(idCurrentUser, idRefuse)
      await UserModel.deleteRequestLogOfFriend(idCurrentUser, idRefuse)
      res.sendStatus(200)
    } catch(e){
      next(createError.InternalServerError())
    }
  }
}

module.exports = new User()
