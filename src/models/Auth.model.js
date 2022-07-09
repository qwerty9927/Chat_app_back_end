const DB = require('./DB.model')
const Redis = require('./Redis.model')
const bcrypt = require('bcrypt')
class AuthModel extends DB{
  constructor(){
    super()
  }

  async checkAcc(data){
    let password = data.Password
    // console.log(password)
    let where = `where Username = '${data.Username}'`
    try{
      let result = await this.select("account", '*', where)
      for(let i of result){
        const match = await bcrypt.compare(password, i.Password)
        // console.log(match)
        if(match){
          return { status: true, role: i.Role, name: i.Name, image: i.Image }
        }
      }
      return { status: false }
    } catch(err){
      console.log(err)
      return { status: false }
    }
  }

  async isUsername(data){
    let where = `where Username = '${data}'`
    try{
      let result = await this.select("account", '*', where)
      if(result.length > 0) return true
      return false
    } catch(err){
      console.log(err)
    }
  }

  async createAcc(data){
    let date = new Date()
    data.DateCreate = date.toISOString().split('T')[0]
    data.Password = await bcrypt.hash(data.Password, 10)
    data.Status = 1
    data.Role = 2
    if(await this.insert("account", data)){
      return true
    }
    return false
  }

  async setToken(key, value){
    return await Redis.setValue(key, value)
  }

  async getToken(key){
    return await Redis.getValue(key)
  }

  async delToken(key){
    return await Redis.delKey(key)
  }
}

module.exports = new AuthModel()