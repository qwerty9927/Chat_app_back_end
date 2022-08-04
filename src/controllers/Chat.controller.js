const createError = require('http-errors')
const ChatModel = require("../models/Chat.model")
const UserModel = require('../models/User.model')

class Chat{
  async checkRoom(req, res, next){
    const idCurrentUser = req.username
    const idRoom = req.query.room
    if(idRoom){
      try{
        const result = await UserModel.isExistRoom(idCurrentUser, idRoom)
        if(result){
          next()
        } else {
          next(createError.Forbidden())
        }
      } catch(e){
        next(createError.InternalServerError())
      }
    } else {
      next(createError.UnprocessableEntity())
    }
  }

  async getMessage(req, res, next){
    const room = req.query.room
    const page = req.query.page
    const quantity = req.query.quantity
    if(room && page && quantity){
      try {
        const result = await ChatModel.getMessage(room, page, quantity)
        res.status(200).json(result)
      } catch(e){
        next(createError.InternalServerError())
      } 
    } else {
      next(createError.UnprocessableEntity())
    }
  }
}

module.exports = new Chat()