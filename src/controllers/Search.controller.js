const createError = require('http-errors')
const SearchModel = require('../models/Search.model')
class Search{

  async searchUserToChat(req, res, next){
    const idCurrentUser = req.username
    const searchValue = req.query.searchValue
    const page = req.query.page
    const quantity = req.query.quantity
    try{
      const result = await SearchModel.findUserToChat(idCurrentUser, searchValue, page, quantity)
      res.status(200).json(result)
    }catch(e){
      console.log(e)
      next(createError.InternalServerError())
    }
  }

  async quantityUserToChatFound(req, res, next){
    const idCurrentUser = req.username
    const searchValue = req.query.searchValue
    try{
      const result = await SearchModel.quantityUserToChat(idCurrentUser, searchValue)
      res.status(200).json(result)
    }catch(e){
      console.log(e)
      next(createError.InternalServerError())

    }
  }

  async searchUserToAdd(req, res, next){
    const idCurrentUser = req.username
    const searchValue = req.query.searchValue
    const page = req.query.page
    const quantity = req.query.quantity
    try{
      const result = await SearchModel.findUserToAdd(idCurrentUser, searchValue, page, quantity)
      res.status(200).json(result)
    }catch(e){
      console.log(e)
      next(createError.InternalServerError())

    }
  }

  async quantityUserToAddFound(req, res, next){
    const idCurrentUser = req.username
    const searchValue = req.query.searchValue
    try{
      const result = await SearchModel.quantityUserToAdd(idCurrentUser, searchValue)
      res.status(200).json(result)
    }catch(e){
      console.log(e)
      next(createError.InternalServerError())
    }
  }

  async searchUserInRequestBox(req, res, next){
    const idCurrentUser = req.username
    const searchValue = req.query.searchValue
    const page = req.query.page
    const quantity = req.query.quantity
    try{
      const result = await SearchModel.findUserInRequestBox(idCurrentUser, searchValue, page, quantity)
      res.status(200).json(result)
    }catch(e){
      console.log(e)
      next(createError.InternalServerError())
    }
  }

  async quantityRequestFound(req, res, next){
    const idCurrentUser = req.username
    const searchValue = req.query.searchValue
    try{
      const result = await SearchModel.quantityRequest(idCurrentUser, searchValue)
      res.status(200).json(result)
    }catch(e){
      console.log(e)
      next(createError.InternalServerError())
    }
  }

}

module.exports = new Search()
