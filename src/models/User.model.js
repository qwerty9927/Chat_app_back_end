const DB = require('./DB.model')
class UserModel extends DB {
  constructor(){
    super()
  }
  
  async createTableFriend(id){
    const sql = `CREATE TABLE list_friend_${id} (
      idFriend varchar(20) NOT NULL PRIMARY KEY,
      NameFriend nVarchar(20),
      Image varchar(100),
      idRoom varchar(50)
    )`
    try{
      await this.excuseQuery(sql)
      return true
    }catch(e){
      console.log(e)
      throw e.message
    }
  }

  async createTableRequest(id){
    const sql = `CREATE TABLE mail_request_${id} (
      idUser varchar(20) NOT NULL PRIMARY KEY,
      NameUserReq nVarchar(20),
      Image varchar(100)
    )`
    try{
      await this.excuseQuery(sql)
      return true
    }catch(e){
      console.log(e)
      throw e.message
    }
  }

  async createTableRequestLog(id){
    const sql = `CREATE TABLE request_log_${id} (
      idUserLog varchar(20) NOT NULL PRIMARY KEY
    )`
    try{
      await this.excuseQuery(sql)
      return true
    }catch(e){
      console.log(e)
      throw e.message
    }
  }

  async createTableGroupOfUser(id){
    const sql = `CREATE TABLE user_group_${id} (
      idGroup int(10) NOT NULL PRIMARY KEY,
      NameGroup nVarchar(20),
      Image varchar(100),
      JoinDate date
    )`
    try{
      await this.excuseQuery(sql)
      return true
    }catch(e){
      console.log(e)
      throw e.message
    }
  }

  async getFriend(idCurrentUser, quantity){
    try{
      const result = {}
      result.friendOfQuery = await this.select(`list_friend_${idCurrentUser}`, "*", `Limit ${quantity} `)
      result.count = (await this.select(`list_friend_${idCurrentUser}`, "Count(*) as count"))[0].count
      return result
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async getRequest(idCurrentUser, quantity){
    try{
      const result = {}
      result.requestOfQuery = await this.select(`mail_request_${idCurrentUser}`, "*", `Limit ${quantity} `)
      result.count = (await this.select(`mail_request_${idCurrentUser}`, "Count(*) as count"))[0].count
      return result
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async addRequestToFriend(idOfFriend, mySelf){
    const sql = `Insert into mail_request_${idOfFriend} (idUser, Name, Image) Values ('${mySelf.username}', '${mySelf.Name}', '${mySelf.Image}')`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async addRequestToLog(idOfFriend, idMySelf){
    const sql = `Insert into request_log_${idMySelf} (idUserLog) Values ('${idOfFriend}')`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async addFriendToMyListFriend(idMySelf, friend, idRoom){
    const sql = `Insert into list_friend_${idMySelf} (idFriend, NameFriend, Image, idRoom) Values ('${friend.username}', '${friend.Name}', '${friend.Image}', ${idRoom})`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async addFriendToYourListFriend(idOfFriend, myself, idRoom){
    const sql = `Insert into list_friend_${idOfFriend} (idFriend, NameFriend, Image, idRoom) Values ('${myself.username}', '${myself.Name}', '${myself.Image}', ${idRoom})`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async createRoom(idRoom){
    const sql = `Create table ${idRoom} (
      idMessage int(10) NOT NULL PRIMARY KEY,
      idAuthor varchar(20),
      Message nVarchar(255),
      Image varchar(200),
      Time Timestamp
    )`
    try {
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async deleteRequestInMail(idCurrentUser, idRefuse){
    const sql = `Delete from mail_request_${idCurrentUser} where idUser = ${idRefuse}`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async deleteInRequestLog(idRefuse, idCurrentUser){
    const sql = `Delete from request_log_${idRefuse} where idUserLog = ${idCurrentUser}`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }
}

module.exports = new UserModel()
