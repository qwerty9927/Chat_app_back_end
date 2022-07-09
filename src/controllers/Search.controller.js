const SearchModel = require('../models/Search.model')
class Search{

  async searchUserToChat(req, res){
    const idCurrentUser = req.query.idCurrentUser
    const searchValue = req.query.searchValue
    const page = req.query.page
    const quantity = req.query.quantity
    try{
      const result = await SearchModel.findUserToChat(idCurrentUser, searchValue, page, quantity)
      res.status(200).json(result)
    }catch(e){
      res.sendStatus(500)
    }
  }

  async quantityUserToChatFound(req, res){
    const idCurrentUser = req.query.username
    const searchValue = req.query.searchValue
    try{
      const result = await SearchModel.quantityUserToChat(idCurrentUser, searchValue)
      res.status(200).json(result)
    }catch(e){
      res.sendStatus(500)
    }
  }

  async searchUserToAdd(req, res){
    const idCurrentUser = req.query.idCurrentUser
    const searchValue = req.query.searchValue
    const quantity = req.query.quantity
    try{
      const result = await SearchModel.findUserToAdd(idCurrentUser, searchValue, quantity)
      res.status(200).json(result)
    }catch(e){
      res.sendStatus(500)
    }
  }

  async quantityUserToAddFound(req, res){
    const idCurrentUser = req.query.username
    const searchValue = req.query.searchValue
    try{
      const result = await SearchModel.quantityUserToAdd(idCurrentUser, searchValue)
      res.status(200).json(result)
    }catch(e){
      res.sendStatus(500)
    }
  }

  async searchUserInRequestBox(req, res){
    const idCurrentUser = req.query.idCurrentUser
    const searchValue = req.query.searchValue
    const quantity = req.query.quantity
    try{
      const result = await SearchModel.findUserInRequestBox(idCurrentUser, searchValue, quantity)
      res.status(200).json(result)
    }catch(e){
      res.sendStatus(500)
    }
  }

  async quantityRequestFound(req, res){
    const idCurrentUser = req.query.username
    const searchValue = req.query.searchValue
    try{
      const result = await SearchModel.quantityRequest(idCurrentUser, searchValue)
      res.status(200).json(result)
    }catch(e){
      res.sendStatus(500)
    }
  }

}

module.exports = new Search()
