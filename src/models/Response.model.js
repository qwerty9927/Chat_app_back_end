const moment = require('moment')
const DB = require('./DB.model')

class ResponseModel extends DB {
  async createRoom(idRoom){
    const sql = `Create table ${'Friend_message_' + idRoom} (
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

  async getResponseModel(idCurrentUser, page, quantity){
    try {
      const sql = `Select * from mail_response_${idCurrentUser} Limit ${page*quantity},${quantity}`
      const responseOfQuery = await this.excuseQuery(sql)
      return {responseOfQuery}
    } catch (e){
      console.log(e)
      throw e.message
    }
  }

  async getQuantityResponse(idCurrentUser){
    try {
      const sql = `Select Count(*) as count from mail_response_${idCurrentUser}`
      return (await this.excuseQuery(sql))[0].count
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async sendResponseUser(mySelf, idMySelf, idOfFriend, isAccept){
    const sql = `Insert into mail_response_${idOfFriend} (idUser, NameRes, Image, Type, isAccept) Values ('${idMySelf}', '${mySelf.Name}', '${mySelf.Image}', 'User', ${isAccept})`
    try {
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

  async deleteMailRequestUser(idCurrentUser, idFriend){
    const sql = `Delete from mail_request_${idCurrentUser} where idUser = '${idFriend}'`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async deleteRequestLog(idCurrentUser, idFriend){
    const sql = `Delete from request_log_${idFriend} where idUserLog = '${idCurrentUser}'`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async sendResponseGroup(group, idMySelf, idOfFriend, isAccept) {
    const sql = `Insert into mail_response_${idOfFriend} (idUser, NameRes, Image, Type, isAccept) Values ('${idMySelf}', '${group.Name}', '${group.Image}', 'Group', ${isAccept})`
    try {
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async addGroupToMyUserGroup(idOfFriend, group, idRoom){
    const date = moment().format('YYYY-MM-DD')
    const sql = `Insert into user_group_${idOfFriend} (idRoom, NameGroup, Image, JoinDate) Values ('${idRoom}', '${group.Name}', '${group.Image}', '${date}')`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async addToListMember(friend, idRoom){
    const sql = `Insert into list_member_${idRoom} (idMember, NameMember, Image, Role, Status) Values ('${friend.Username}', '${friend.Name}', '${friend.Image}', 0, 1)`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async deleteMailRequestGroup(idCurrentUser, idFriend){
    const sql = `Delete from mail_request_group_${idCurrentUser} where idUser = '${idFriend}'`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }
  
  async deleteGroupLog(idCurrentUser, idRoom){
    const sql = `Delete from group_log_${idRoom} where idUserInvited = '${idCurrentUser}'`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  // User To Group
  async deleteRequestLogGroup(idMySelf, idRoom){
    const sql = `Delete from request_log_group_${idMySelf} where idGroupLog = "${idRoom}"`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async deleteGroupMail(idMySelf, idRoom){
    const sql = `Delete from group_mail_${idRoom} where idUser = "${idMySelf}"`
    try{
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }
}

module.exports = new ResponseModel()