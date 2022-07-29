const moment = require('moment')
const DB = require('./DB.model')

class GroupModel extends DB{
  constructor(){
    super()
  }

  async createGroup(name, image, admin){
    const date = moment().format('YYYY-MM-DD')
    const sql = `Insert into groups (Name, Image, DateCreate, Admin) Values ('${name}', '${image}', '${date}', '${admin}')`
    try {
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

}

module.exports = new GroupModel