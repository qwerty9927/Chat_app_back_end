const { v4: uuidv4 } = require('uuid')
const createError = require('http-errors')
const RequestModel = require('../models/Request.model')

class Request {
  async getListRequest(req, res, next){
    const idCurrentUser = req.username
    const page = req.query.page
    const quantity = req.query.quantity
    if(quantity && page){
      try{
        const result = await RequestModel.getRequestModel(idCurrentUser, page, quantity)
        res.status(200).json(result)
      } catch(e){
        console.log(e)
        next(createError.InternalServerError())
      }
    } else {
      next(createError.UnprocessableEntity())
    }
  }

  async getQuantityListRequest(req, res, next){
    const idCurrentUser = req.username
    try{
      const result = await RequestModel.getQuantityRequestModel(idCurrentUser)
      res.status(200).json(result)
    } catch(e){
      console.log(e)
      next(createError.InternalServerError())
    }
  }

  async sendRequest(req, res, next){
    const data = req.body
    console.log(data)
    // Bảo vệ route xác thực đúng username
    data.mySelf.Username = req.username
    try{
      await RequestModel.addRequestToFriendModel(data.mySelf, data.friend.Username)
      await RequestModel.addRequestToLogModel(data.mySelf.Username, data.friend.Username)
      res.sendStatus(200)
    } catch(e){
      next(createError.InternalServerError())
    }
  }

  async acceptRequest(req, res, next){
    const data = req.body
    const idRoom = uuidv4().replace(/-/g, "")
    // Bảo vệ route xác thực đúng username
    data.mySelf.Username = req.username
    try{
      await RequestModel.addFriendToMyListFriend(data.mySelf.Username, data.friend, idRoom)
      await RequestModel.addFriendToYourListFriend(data.mySelf, data.friend.Username, idRoom)
      await RequestModel.deleteRequestLogOfFriend(data.mySelf.Username, data.friend.Username)
      await RequestModel.deleteMailRequestOfUser(data.mySelf.Username, data.friend.Username)
      await RequestModel.createRoom(idRoom)
      res.sendStatus(200)
    } catch(e){
      next(createError.InternalServerError())
    }
  }

  async refuseRequest(req, res, next){
    const idCurrentUser = req.username
    const idRefuse = req.query.idRefuse
    try {
      await RequestModel.deleteMailRequestOfUser(idCurrentUser, idRefuse)
      await RequestModel.deleteRequestLogOfFriend(idCurrentUser, idRefuse)
      res.sendStatus(200)
    } catch(e){
      next(createError.InternalServerError())
    }
  }
}

module.exports = new Request()