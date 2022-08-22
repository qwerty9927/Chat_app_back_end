const moment = require('moment')
const DB = require('./DB.model')

class Request extends DB {
  constructor(){
    super()
  }

  async getRequestModel(idCurrentUser, page, quantity){
    try{
      const requestOfQuery = await this.select(`mail_request_${idCurrentUser}`, "*", `Limit ${page*quantity}, ${quantity} `)
      return {requestOfQuery}
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async getQuantityRequestModel(idCurrentUser){
    try{
      const quantity = (await this.select(`mail_request_${idCurrentUser}`, "Count(*) as count"))[0].count
      return quantity
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async addRequestToMailModel(mySelf, idOfFriend){
    const sql = `Insert into mail_request_${idOfFriend} (idUser, NameUserReq, Image) Values ('${mySelf.Username}', '${mySelf.Name}', '${mySelf.Image}')`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async addRequestToMyLogUserModel(idMySelf, idOfFriend){
    const sql = `Insert into request_log_${idMySelf} (idUserLog) Values ('${idOfFriend}')`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async addInvitationToMailModel(idMySelf, idOfFriend, group, idRoom){
    const sql = `Insert into mail_request_group_${idOfFriend} (idRoom, NameGroup, ImageGroup, idUserInvite) Values ('${idRoom}', '${group.Name}', '${group.Image}', '${idMySelf}')`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async addInvitationToLogOfGroupModel(idMySelf, friend, idRoom){
    const sql = `Insert into group_log_${idRoom} (idUserInvited, NameUser, Image, idUserInvite) Values ('${friend.Username}', '${friend.Name}', '${friend.Image}', '${idMySelf}')`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async addRequestToMailGroupModel(mySelf, message, idRoom){
    const date = moment().format("YYYY-MM-DD")
    const sql = `Insert into group_mail_${idRoom} (idUser, NameUser, Image, Message, Date) Values ('${mySelf.Username}', '${mySelf.Name}', '${mySelf.Image}', '${message}', '${date}')`
    try {
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async addRequestToMyLogGroupModel(idMySelf, idRoom){
    const sql = `Insert into request_log_group_${idMySelf} (idGroupLog) values ('${idRoom}')`
    try {
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }

  }
}

module.exports = new Request()
