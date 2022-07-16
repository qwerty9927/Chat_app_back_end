const ChatModel = require("../models/Chat.model")
const UserModel = require("../models/User.model")

class Chat{
  async checkRoom(req, res, next){
    const idCurrentUser = req.username
    const idRoom = req.query.room
    try{
      const result = await UserModel.isExistRoom(idCurrentUser, idRoom)
      if(result){
        next()
      } else {
        res.sendStatu(403)
      }
    } catch(e){
      res.sendStatus(500)
    }
  }

  async getMessage(req, res){
    const room = req.query.room
    const page = req.query.page
    const quantity = req.query.quantity
    try {
      const result = await ChatModel.getMessage(room, page, quantity)
      res.status(200).json(result)
    } catch(e){
      res.sendStatus(500)
    } 
  }
}

module.exports = new Chat()