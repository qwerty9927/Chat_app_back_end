const DB = require('./DB.model')
class SearchModel extends DB{

  async findUserToChat(username, searchValue, quantity){
    const sql = `Select * from list_friend_${username} where NameFriend like '${searchValue}%' Limit ${quantity}`
    const sqlCount = `Select Count(*) as count from list_friend_${username} where NameFriend like '${searchValue}%'`
    try{
      let result = {}
      result.friendOfQuery = await this.excuseQuery(sql)
      result.count = (await this.excuseQuery(sqlCount))[0].count
      return result
    }catch(e){
      console.log(e)
      throw e.message
    }
  }

  async findUserToAdd(username, searchValue, quantity){
    const sql = 
    `
      Select Username, Name, ac.Image, idUserLog
      from account as ac
        INNER JOIN list_friend_${username} ON  Username <> idFriend 
        LEFT JOIN request_log_${username} ON idUserLog = Username 
      where Username <> "${username}" and idFriend IS NOT NULL and Name like '${searchValue}%'
    `
    
    const sqlCount = 
    ` 
      Select Count(*) as count 
      from account as ac
        INNER JOIN list_friend_${username} ON  Username <> idFriend 
        LEFT JOIN request_log_${username} ON idUserLog = Username 
      where Username <> "${username}" and idFriend IS NOT NULL and Name like '${searchValue}%'
    `
    try{
      let result = {}
      result.userOfQuery = await this.excuseQuery(sql)
      result.count = await this.excuseQuery(sqlCount)
      return result
    }catch(e){
      console.log(e)
      throw e.message
    }
  }

  async findUserInRequestBox(username, searchValue, quantity){
    const sql = `Select idUser, NameUserReq, Image from mail_request_${username} where NameUserReq like '${searchValue}%' Limit ${quantity}`
    const sqlCount = `Select Count(*) as count from mail_request_${username} where NameUserReq like '${searchValue}%'`
    try{
      let result = {}
      result.requestOfQuery = await this.excuseQuery(sql)
      result.count = await this.excuseQuery(sqlCount)
      return result
    }catch(e){
      console.log(e)
      throw e.message
    }
  }

}

module.exports = new SearchModel()
