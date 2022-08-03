const { v4: uuidv4 } = require('uuid')
const createError = require('http-errors')
const ResponseModel = require("../models/Response.model")

class Response {
  async getListResponse(req, res, next){
    const idCurrentUser = req.username
    const page = req.query.page
    const quantity = req.query.quantity
    if(page && quantity){
      try {
        const result = await ResponseModel.getResponseModel(idCurrentUser, page, quantity)
        res.status(200).json(result)
      } catch (e){
        next(e)
      }
    } else {
      next(createError.UnprocessableEntity())
    }
  }

  async getQuantityListResponse(req, res, next){
    const idCurrentUser = req.username
    try {
      const result = await ResponseModel.getQuantityResponse(idCurrentUser)
      res.status(200).json(result)
    } catch(e){
      next(e)
    }
  }

  async acceptRequestUser(req, res, next){
    const data = req.body
    const idRoom = uuidv4().replace(/-/g, "")
    // Bảo vệ route xác thực đúng username
    data.mySelf.Username = req.username
    try{
      await ResponseModel.addFriendToMyListFriend(data.mySelf.Username, data.friend, idRoom)
      await ResponseModel.addFriendToYourListFriend(data.mySelf, data.friend.Username, idRoom)
      await ResponseModel.deleteRequestLog(data.mySelf.Username, data.friend.Username)
      await ResponseModel.deleteMailRequestUser(data.mySelf.Username, data.friend.Username)
      await ResponseModel.createRoom(idRoom)
      await ResponseModel.sendResponseUser(data.mySelf, data.mySelf.Username, data.friend.Username, 1)
      res.sendStatus(200)
    } catch(e){
      next(createError.InternalServerError())
    }
  }

  async refuseRequestUser(req, res, next){
    const data = req.body
    // Bảo vệ route xác thực đúng username
    data.mySelf.Username = req.username
    try {
      await ResponseModel.deleteMailRequestUser(data.mySelf.Username, data.friend.Username)
      await ResponseModel.deleteRequestLog(data.mySelf.Username, data.friend.Username)
      await ResponseModel.sendResponseUser(data.mySelf, data.mySelf.Username, data.friend.Username, 0)
      res.sendStatus(200)
    } catch(e){
      next(createError.InternalServerError())
    }
  }

  async acceptRequestGroup(req, res, next){
    const data = req.body
    const idRoom = data.idRoom
    // Bảo vệ route xác thực đúng username
    data.mySelf.Username = req.username
    try{
      await ResponseModel.addGroupToMyUserGroup(data.mySelf.Username, data.group, idRoom)
      await ResponseModel.addToListMember(data.mySelf, idRoom)
      await ResponseModel.deleteGroupLog(data.mySelf.Username, idRoom)
      await ResponseModel.deleteMailRequestGroup(data.mySelf.Username, data.friend.Username)
      await ResponseModel.sendResponseGroup(data.group, data.mySelf.Username, data.friend.Username, 1)
      res.sendStatus(200)
    } catch(e){
      next(createError.InternalServerError())
    }
  }

  async refuseRequestGroup(req, res, next){
    const data = req.body
    // Bảo vệ route xác thực đúng username
    data.mySelf.Username = req.username
    try {
      await ResponseModel.deleteMailRequestGroup(data.mySelf.Username, data.friend.Username)
      await ResponseModel.deleteGroupLog(data.mySelf.Username, data.idRoom)
      await ResponseModel.sendResponseGroup(data.group, data.mySelf.Username, data.friend.Username, 0)
      res.sendStatus(200)
    } catch(e){
      next(createError.InternalServerError())
    }
  }
}

module.exports = new Response()