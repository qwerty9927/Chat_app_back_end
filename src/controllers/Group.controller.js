const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const createError = require('http-errors')
const GroupModel = require('../models/Group.model')
const RequestModel = require('../models/Request.model')

class Group {
  async createGroup(req, res, next) {
    const idRoom = uuidv4().replace(/-/g, "")
    const data = req.body
    const path = __basedir + `\\public\\uploads\\imgs\\rooms\\${idRoom}`
    // Bảo vệ route xác thực đúng username
    data.mySelf.Username = req.username
    try {
      fs.mkdirSync(path)
      await GroupModel.createGroup(data.group.Name, data.group.Image, data.mySelf.Username, idRoom)
      await GroupModel.createTableGroupMember(idRoom)
      await GroupModel.createTableGroupMail(idRoom)
      await GroupModel.createTableGroupLog(idRoom)
      await GroupModel.createTableGroupMessage(idRoom)
      await GroupModel.insertAdminInGroup(data.mySelf, idRoom)
      await GroupModel.insertGroupToList(data.group, data.mySelf.Username, idRoom)
      res.sendStatus(200)
    } catch (e){
      next(createError.InternalServerError())
    }
  }

  async getListGroup(req, res, next){
    try {
      const result = await GroupModel.getGroupModel(req.username)
      res.status(200).json(result)
    } catch(e){
      next(e)
    }
  }

  async getQuantityListGroup(req, res, next){
    try {
      const result = await GroupModel.getQuantityGroup(req.username)
      res.status(200).json(result)
    } catch(e){
      next(e)
    }
  }
}

module.exports = new Group()