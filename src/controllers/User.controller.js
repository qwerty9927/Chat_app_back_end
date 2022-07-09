const { v4: uuidv4 } = require('uuid')
const UserModel = require('../models/User.model')

class User {

  async getListRequest(req, res){
    const idCurrentUser = req.query.username
    const page = req.query.page
    const quantity = req.query.quantity
    try{
      const result = await UserModel.getRequest(idCurrentUser, page, quantity)
      res.status(200).json(result)
    } catch(e){
      console.log(e)
      res.sendStatus(500)
    }
  }

  async getQuantityListRequest(req, res){
    const idCurrentUser = req.query.username
    try{
      const result = await UserModel.getQuantityRequest(idCurrentUser)
      res.status(200).json(result)
    } catch(e){
      console.log(e)
      res.sendStatus(500)
    }
  }

  async getListFriend(req, res){
    const idCurrentUser = req.query.username
    const page = req.query.page
    const quantity = req.query.quantity
    if(idCurrentUser && quantity && page){
      try{
        const result = await UserModel.getFriend(idCurrentUser, page, quantity)
        res.status(200).json(result)
      } catch(e){
        console.log(e)
        res.sendStatus(500)
      }
    } else {
      res.sendStatus(422)
    }
  }

  async getQuantityListFriend(req, res){
    const idCurrentUser = req.query.username
    if(idCurrentUser){
      try{
        const result = await UserModel.getQuantityFriend(idCurrentUser)
        res.status(200).json(result)
      } catch(e){
        console.log(e)
        res.sendStatus(500)
      }
    } else {
      res.sendStatus(422)
    }
  }

  async postRequest(req, res){
    const data = req.body
    try{
      await UserModel.addRequestToFriend(data.friend.idOfFriend, data.mySelf)
      await UserModel.addRequestToLog(data.friend.idOfFriend, data.mySelf.idMySelf)
      res.sendStatus(200)
    } catch(e){
      res.sendStatus(500)
    }
  }

  async addFriend(req, res){
    const data = req.body
    const idRoom = uuidv4()
    try{
      await UserModel.addFriendToMyListFriend(data.mySelf.idMySelf, data.friend, idRoom)
      await UserModel.addFriendToYourListFriend(data.friend.idOfFriend, data.mySelf, idRoom)
      await UserModel.createRoom(idRoom)
      res.sendStatus(200)
    } catch(e){
      res.sendStatus(500)
    }
  }

  async refuseRequest(req, res){
    const idCurrentUser = req.query.username
    const idRefuse = req.query.idRefuse
    try {
      await UserModel.deleteRequestInMail(idCurrentUser, idRefuse)
      await UserModel.deleteInRequestLog(idRefuse, idCurrentUser)
      res.sendStatus(200)
    } catch(e){
      res.sendStatus(500)
    }
  }
}

module.exports = new User()
