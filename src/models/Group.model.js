const moment = require('moment')
const DB = require('./DB.model')

class GroupModel extends DB{
  constructor(){
    super()
  }

  async createTableGroupMessage(idRoom){
    const sql = `Create table group_message_${idRoom} (
      idMessage int(10) NOT NULL PRIMARY KEY,
      idAuthor varchar(20),
      Image varchar(100),
      Time timestamp
    )`
    try {
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async createTableGroupMember(idRoom){
    const sql = `Create table list_member_${idRoom} (
      idMember varchar(20) NOT NULL PRIMARY KEY,
      NameMember varchar(20),
      Image varchar(100),
      Role int(2),
      Status int(2)
    )`
    try {
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async createTableGroupMail(idRoom){
    const sql = `Create table group_mail_${idRoom} (
      idUser varchar(20) NOT NULL PRIMARY KEY,
      NameUser varchar(20),
      Image varchar(100),
      Message varchar(200),
      Date date
    )`
    try {
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async createTableGroupLog (idRoom){
    const sql = `Create table group_log_${idRoom} (
      idUserInvited varchar(20) NOT NULL PRIMARY KEY,
      NameUser varchar(20),
      Image varchar(100),
      idUserInvite varchar(20) 
    )`
      // FOREIGN KEY (idUserInvite) REFERENCES list_member_${idRoom}(idMember)
    try {
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async createGroup(name, image, admin, idRoom){
    const date = moment().format('YYYY-MM-DD')
    const sql = `Insert into groups (idRoom, Name, Image, DateCreate, Admin) Values ('${idRoom}', '${name}', '${image}', '${date}', '${admin}')`
    try {
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async insertAdminInGroup(mySelf, idRoom){
    const sql = `Insert into list_member_${idRoom} (idMember, NameMember, Image, Role, Status) Values ('${mySelf.Username}', '${mySelf.Name}', '${mySelf.Image}', 1, 1)`
    try {
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async insertGroupToList(group, idMySelf, idRoom){
    const date = moment().format('YYYY-MM-DD')
    const sql = `Insert into user_group_${idMySelf} (idRoom, NameGroup, Image, JoinDate) Values ('${idRoom}', '${group.Name}', '${group.Image}', '${date}')`
    try {
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

  async getGroupModel(idCurrentUser){
    const sql = `Select * from user_group_${idCurrentUser}`
    try {
      const groupOfQuery = await this.excuseQuery(sql)
      return {groupOfQuery}
    } catch (e){
      console.log(e)
      throw e.message
    }
  }

  async getQuantityGroup(idCurrentUser){
    const sql = `Select Count(*) as count from user_group_${idCurrentUser}`
    try {
      return (await this.excuseQuery(sql))[0].count
    } catch (e){
      console.log(e)
      throw e.message
    }
  }

  

}

module.exports = new GroupModel