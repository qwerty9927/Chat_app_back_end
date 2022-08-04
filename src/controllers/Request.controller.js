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

  async sendRequestUser(req, res, next){
    const data = req.body
    // Bảo vệ route xác thực đúng username
    data.mySelf.Username = req.username
    try{
      await RequestModel.addRequestToMailModel(data.mySelf, data.friend.Username)
      await RequestModel.addRequestToMyLogUserModel(data.mySelf.Username, data.friend.Username)
      res.sendStatus(200)
    } catch(e){
      next(createError.InternalServerError())
    }
  }

  async sendInvitationGroup(req, res, next){
    const data = req.body
    // Bảo vệ route xác thực đúng username
    data.mySelf.Username = req.username
    try{
      await RequestModel.addInvitationToMailModel(data.mySelf.Username, data.friend.Username, data.group, data.idRoom)
      await RequestModel.addInvitationToLogOfGroupModel(data.mySelf.Username, data.friend, data.idRoom)
      res.sendStatus(200)
    } catch(e){
      next(createError.InternalServerError())
    }
  }

  async sendRequestToGroup(req, res, next){
    const data = req.body
    // Bảo vệ route xác thực đúng username
    data.mySelf.Username = req.username
    try {
      await RequestModel.addRequestToMailGroupModel(data.mySelf, data.message, data.idRoom)
      await RequestModel.addRequestToMyLogGroupModel(data.mySelf.Username, data.idRoom)
      res.sendStatus(200)
    } catch(e){
      next(createError.InternalServerError())
    }
  }
}

module.exports = new Request()