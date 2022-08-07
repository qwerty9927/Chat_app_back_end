const createError = require('http-errors')
const SearchModel = require('../models/Search.model')
class Search{

  async searchFriendToChat(req, res, next){
    const idCurrentUser = req.username
    const searchValue = req.query.searchValue
    const page = req.query.page
    const quantity = req.query.quantity
    if(searchValue && page && quantity){
      try{
        const result = await SearchModel.searchFriendToChatModel(idCurrentUser, searchValue, page, quantity)
        res.status(200).json(result)
      }catch(e){
        console.log(e)
        next(createError.InternalServerError())
      }
    } else {
      next(createError.UnprocessableEntity())
    }
  }

  async quantityFriendToChat(req, res, next){
    const idCurrentUser = req.username
    const searchValue = req.query.searchValue
    if(searchValue){
      try{
        const result = await SearchModel.quantityFriendToChatModel(idCurrentUser, searchValue)
        res.status(200).json(result)
      }catch(e){
        console.log(e)
        next(createError.InternalServerError())
  
      }
    } else {
      next(createError.UnprocessableEntity())
    }
  }

  async searchUserToAdd(req, res, next){
    const idCurrentUser = req.username
    const searchValue = req.query.searchValue
    const page = req.query.page
    const quantity = req.query.quantity
    if(searchValue && page && quantity){
      try{
        const result = await SearchModel.searchUserToAddModel(idCurrentUser, searchValue, page, quantity)
        res.status(200).json(result)
      }catch(e){
        console.log(e)
        next(createError.InternalServerError())
      }
    } else {
      next(createError.UnprocessableEntity())
    }
  }

  async quantityUserToAdd(req, res, next){
    const idCurrentUser = req.username
    const searchValue = req.query.searchValue
    if(searchValue){
      try{
        const result = await SearchModel.quantityUserToAddModel(idCurrentUser, searchValue)
        res.status(200).json(result)
      }catch(e){
        console.log(e)
        next(createError.InternalServerError())
      }
    } else {
      next(createError.UnprocessableEntity())
    }
  }

  async searchRequest(req, res, next){
    const idCurrentUser = req.username
    const searchValue = req.query.searchValue
    const page = req.query.page
    const quantity = req.query.quantity
    if(searchValue && page && quantity){
      try{
        const result = await SearchModel.searchRequestModel(idCurrentUser, searchValue, page, quantity)
        res.status(200).json(result)
      }catch(e){
        console.log(e)
        next(createError.InternalServerError())
      }
    } else {
      next(createError.UnprocessableEntity())
    }
  }

  async quantityRequestFound(req, res, next){
    const idCurrentUser = req.username
    const searchValue = req.query.searchValue
    if(searchValue){
      try{
        const result = await SearchModel.quantityRequestModel(idCurrentUser, searchValue)
        res.status(200).json(result)
      }catch(e){
        console.log(e)
        next(createError.InternalServerError())
      }
    } else {
      next(createError.UnprocessableEntity())
    }
  }

  async searchGroupToAdd(req, res, next){
    const idCurrentUser = req.username
    const searchValue = req.query.searchValue
    const page = req.query.page
    const quantity = req.query.quantity
    if(searchValue && page && quantity){
      try{
        const result = await SearchModel.searchGroupToAddModel(idCurrentUser, searchValue, page, quantity)
        res.status(200).json(result)
      }catch(e){
        console.log(e)
        next(createError.InternalServerError())
      }
    } else {
      next(createError.UnprocessableEntity())
    }
  }

  async quantityGroupToAdd(req, res, next){
    const idCurrentUser = req.username
    const searchValue = req.query.searchValue
    if(searchValue){
      try{
        const result = await SearchModel.quantityGroupToAddModel(idCurrentUser, searchValue)
        res.status(200).json(result)
      }catch(e){
        console.log(e)
        next(createError.InternalServerError())
      }
    } else {
      next(createError.UnprocessableEntity())
    }
  }

}

module.exports = new Search()
