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

  async createRoom(idRoom){
    const sql = `Create table ${idRoom} (
      idMessage int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
      idAuthor varchar(20),
      Message varchar(255),
      Image varchar(200),
      Time Timestamp NOT NULL
    )`
    try {
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async getFriend(idCurrentUser, page, quantity){
    try{
      const friendOfQuery = await this.select(`list_friend_${idCurrentUser}`, "*", `Limit ${page*quantity}, ${quantity}`)
      return {friendOfQuery}
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async getQuantityFriend(idCurrentUser){
    try{
      const quantity = (await this.select(`list_friend_${idCurrentUser}`, "Count(*) as count"))[0].count
      return quantity
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async getRequest(idCurrentUser, page, quantity){
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

  async addRequestToFriend(mySelf, idOfFriend){
    const sql = `Insert into mail_request_${idOfFriend} (idUser, NameUserReq, Image) Values ('${mySelf.Username}', '${mySelf.Name}', '${mySelf.Image}')`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async addRequestToLog(idMySelf, idOfFriend){
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

  async isExistRoom(idCurrentUser, idRoom){
    const sql = `Select Count(*) as count from list_friend_${idCurrentUser} where idRoom = '${idRoom}'`
    try{
      const result = (await this.excuseQuery(sql))[0].count
      if(result === 1){
        return true
      } else {
        return false
      }
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

}

module.exports = new UserModel()
