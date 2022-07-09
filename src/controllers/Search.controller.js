const SearchModel = require('../models/Search.model')
class Search{

  async searchUserToChat(req, res){
    const idCurrentUser = req.query.idCurrentUser
    const searchValue = req.query.searchValue
    const quantity = req.query.quantity
    try{
      const result = await SearchModel.findUserToChat(idCurrentUser, searchValue, quantity)
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

}

module.exports = new Search()
