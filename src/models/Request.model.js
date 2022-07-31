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

  async addRequestToFriendModel(mySelf, idOfFriend){
    const sql = `Insert into mail_request_${idOfFriend} (idUser, NameUserReq, Image) Values ('${mySelf.Username}', '${mySelf.Name}', '${mySelf.Image}')`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async addRequestToLogModel(idMySelf, idOfFriend){
    const sql = `Insert into request_log_${idMySelf} (idUserLog) Values ('${idOfFriend}')`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async addFriendToMyListFriend(idMySelf, friend, idRoom){
    const sql = `Insert into list_friend_${idMySelf} (idFriend, NameFriend, Image, idRoom) Values ('${friend.Username}', '${friend.Name}', '${friend.Image}', '${idRoom}')`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async addFriendToYourListFriend(myself, idOfFriend, idRoom){
    const sql = `Insert into list_friend_${idOfFriend} (idFriend, NameFriend, Image, idRoom) Values ('${myself.Username}', '${myself.Name}', '${myself.Image}', '${idRoom}')`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async deleteMailRequestOfUser(idCurrentUser, idFriend){
    const sql = `Delete from mail_request_${idCurrentUser} where idUser = '${idFriend}'`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async deleteRequestLogOfFriend(idCurrentUser, idFriend){
    const sql = `Delete from request_log_${idFriend} where idUserLog = '${idCurrentUser}'`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }
}

module.exports = new Request()
