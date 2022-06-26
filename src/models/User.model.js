const DB = require('./DB.model')
class UserModel extends DB {
  constructor(){
    super()
  }
  async createUser(data){
    if(await this.insert("user", data)){
      return true
    }
    return false
  }
  async getUser(username){
    try{
      const response = await this.select("user", "*", `Where Username = '${username}'`)
      return {status: true, res: response[0]}
    } catch (e){
      console.log(e)
      return {status: false, res: null}
    }
  }

  async getAllUser(){
    try{
      const response = await this.select('user')
      return {status: true, res: response}
    } catch (e){
      return {status: false, res: e.message}
    }
  }
}

module.exports = new UserModel()