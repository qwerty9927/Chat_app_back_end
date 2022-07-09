const DB = require('./DB.model')
class SearchModel extends DB{

  async findUserToChat(idCurrentUser, searchValue, page, quantity){
    const sql = `Select * from list_friend_${idCurrentUser} where NameFriend like '${searchValue}%' Limit ${page*quantity}, ${quantity}`
    try{
      const friendOfQuery = await this.excuseQuery(sql)
      return {friendOfQuery}
    }catch(e){
      console.log(e)
      throw e.message
    }
  }

  async quantityUserToChat(idCurrentUser, searchValue){
    const sql = `Select Count(*) as count from list_friend_${idCurrentUser} where NameFriend like '${searchValue}%'`
    try{
      const quantity = (await this.excuseQuery(sql))[0].count
      return quantity
    }catch(e){
      console.log(e)
      throw e.message
    }
  }

  async findUserToAdd(idCurrentUser, searchValue, quantity){
    const sql = `
      Select Username, Name, ac.Image, idUserLog
      from account as ac
        INNER JOIN list_friend_${idCurrentUser} ON  Username <> idFriend 
        LEFT JOIN request_log_${idCurrentUser} ON idUserLog = Username 
      where Username <> "${idCurrentUser}" and idFriend IS NOT NULL and Name like '${searchValue}%'
    `
    try{
      const userOfQuery = await this.excuseQuery(sql)
      return {userOfQuery}
    }catch(e){
      console.log(e)
      throw e.message
    }
  }

  async quantityUserToAdd(idCurrentUser, searchValue){
    const sql = `
      Select Count(*) as count 
      from account as ac
        INNER JOIN list_friend_${idCurrentUser} ON  Username <> idFriend 
        LEFT JOIN request_log_${idCurrentUser} ON idUserLog = Username 
      where Username <> "${idCurrentUser}" and idFriend IS NOT NULL and Name like '${searchValue}%'
    `
    try{
      const quantity = (await this.excuseQuery(sql))[0].count
      return quantity
    }catch(e){
      console.log(e)
      throw e.message
    }
  }

  async findUserInRequestBox(idCurrentUser, searchValue, quantity){
    const sql = `Select idUser, NameUserReq, Image from mail_request_${idCurrentUser} where NameUserReq like '${searchValue}%' Limit ${quantity}`
    try{
      const requestOfQuery = await this.excuseQuery(sql)
      return requestOfQuery
    }catch(e){
      console.log(e)
      throw e.message
    }
  }

  async quantityRequest(idCurrentUser, searchValue){
    const sql = `Select Count(*) as count from mail_request_${idCurrentUser} where NameUserReq like '${searchValue}%'`
    try{
      const quantity = (await this.excuseQuery(sql))[0].count
      return quantity
    }catch(e){
      console.log(e)
      throw e.message
    }
  }

}

module.exports = new SearchModel()
