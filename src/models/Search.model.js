const DB = require('./DB.model')
class SearchModel extends DB{

  async searchFriendToChatModel(idCurrentUser, searchValue, page, quantity){
    const sql = `Select * from list_friend_${idCurrentUser} where NameFriend like '${searchValue}%' Limit ${page*quantity}, ${quantity}`
    try{
      const friendOfQuery = await this.excuseQuery(sql)
      return {friendOfQuery}
    }catch(e){
      console.log(e)
      throw e.message
    }
  }

  async quantityFriendToChatModel(idCurrentUser, searchValue){
    const sql = `Select Count(*) as count from list_friend_${idCurrentUser} where NameFriend like '${searchValue}%'`
    try{
      const quantity = (await this.excuseQuery(sql))[0].count
      return quantity
    }catch(e){
      console.log(e)
      throw e.message
    }
  }

  async searchUserToAddModel(idCurrentUser, searchValue, page, quantity){
    const sql = `
      Select Username, Name, ac.Image, idUserLog
      From account as ac LEFT join request_log_${idCurrentUser} on ac.Username = idUserLog
      Where ac.Username <> "${idCurrentUser}" and ac.username not in (
        Select idFriend
        From list_friend_${idCurrentUser}
      ) and ac.Name like '${searchValue}%' Limit ${page*quantity}, ${quantity}
    `
    try{
      const userOfQuery = await this.excuseQuery(sql)
      return {userOfQuery}
    }catch(e){
      console.log(e)
      throw e.message
    }
  }

  async quantityUserToAddModel(idCurrentUser, searchValue){
    const sql = `
      Select Count(*) as count
      From account as ac LEFT join request_log_${idCurrentUser} on ac.Username = idUserLog
      Where ac.Username <> "${idCurrentUser}" and ac.username not in (
        Select idFriend
        From list_friend_${idCurrentUser}
      ) and ac.Name like '${searchValue}%'
    `
    try{
      const quantity = (await this.excuseQuery(sql))[0].count
      return quantity
    }catch(e){
      console.log(e)
      throw e.message
    }
  }

  async searchRequestModel(idCurrentUser, searchValue, page, quantity){
    const sql = `Select idUser, NameUserReq, Image from mail_request_${idCurrentUser} where NameUserReq like '${searchValue}%' Limit ${page*quantity}, ${quantity}`
    try{
      const requestOfQuery = await this.excuseQuery(sql)
      return {requestOfQuery}
    }catch(e){
      console.log(e)
      throw e.message
    }
  }

  async quantityRequestModel(idCurrentUser, searchValue){
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
