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

  async getQuantityRequest(idCurrentUser){
    try{
      const quantity = (await this.select(`mail_request_${idCurrentUser}`, "Count(*) as count"))[0].count
      return quantity
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async addToMailRequestModel(mySelf, idOfFriend){
    const sql = `Insert into mail_request_${idOfFriend} (idUser, NameUserReq, Image) Values ('${mySelf.Username}', '${mySelf.Name}', '${mySelf.Image}')`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async addRequestToLogOfUserModel(idMySelf, idOfFriend){
    const sql = `Insert into request_log_${idMySelf} (idUserLog, Type) Values ('${idOfFriend}', 'User')`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async addToMailRequestGroupModel(idMySelf, idOfFriend, group, idRoom){
    const sql = `Insert into mail_request_group_${idOfFriend} (idUser, NameGroup, ImageGroup, idRoom) Values ( '${idMySelf}', '${group.Name}', '${group.Image}', '${idRoom}')`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async addRequestToLogOfGroupModel(idMySelf, friend, idRoom){
    const sql = `Insert into group_log_${idRoom} (idUserInvited, NameUser, Image, idUserInvite) Values ('${friend.Username}', '${friend.Name}', '${friend.Image}', '${idMySelf}')`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }
}

module.exports = new Request()
