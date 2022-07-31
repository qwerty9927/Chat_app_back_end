const createError = require('http-errors')
const UserModel = require('../models/User.model')

class User {
  async getListFriend(req, res, next){
    const idCurrentUser = req.username
    const page = req.query.page
    const quantity = req.query.quantity
    if(quantity && page){
      try{
        const result = await UserModel.getFriendModel(idCurrentUser, page, quantity)
        res.status(200).json(result)
      } catch(e){
        console.log(e)
        next(createError.InternalServerError())
      }
    } else {
      next(createError.UnprocessableEntity())
    }
  }

  async getQuantityListFriend(req, res, next){
    const idCurrentUser = req.username
    try{
      const result = await UserModel.getQuantityFriendModel(idCurrentUser)
      res.status(200).json(result)
    } catch(e){
      console.log(e)
      next(createError.InternalServerError())
    }
  }
}

module.exports = new User()
