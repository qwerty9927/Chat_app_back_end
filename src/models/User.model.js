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

  async createTableRequestGroup(id){
    const sql = `CREATE TABLE mail_request_group_${id} (
      idUser varchar(20) NOT NULL PRIMARY KEY,
      NameGroup nVarchar(20),
      ImageGroup varchar(100),
      idRoom varChar(50)
    )`
    try{
      await this.excuseQuery(sql)
      return true
    }catch(e){
      console.log(e)
      throw e.message
    }
  }

  async createTableResponse(id){
    const sql = `CREATE TABLE mail_response_${id} (
      idUser varchar(20) NOT NULL PRIMARY KEY ,
      NameRes nVarchar(20),
      Image varchar(100), 
      Type varchar(10),
      isAccept int(2)
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
      idUserLog varchar(20) NOT NULL PRIMARY KEY,
      Type varchar(10)
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
      idRoom varchar(50) NOT NULL PRIMARY KEY,
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

  async getFriendModel(idCurrentUser, page, quantity){
    try{
      const friendOfQuery = await this.select(`list_friend_${idCurrentUser}`, "*", `Limit ${page*quantity}, ${quantity}`)
      return {friendOfQuery}
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async getQuantityFriendModel(idCurrentUser){
    try{
      const quantity = (await this.select(`list_friend_${idCurrentUser}`, "Count(*) as count"))[0].count
      return quantity
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
