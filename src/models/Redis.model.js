const redis = require('redis')
class Redis{
  async connect(){
    this.client = redis.createClient()
    await this.client.connect()
  }
  async getValue(key){
    try{
      this.connect()
      let result = await this.client.get(`${key}`)
      return {isSuccess: true, result: result}
    }catch(err){
      console.log("Get key failed!")
      return {isSuccess: false, result: null}
    }
  }
  async setValue(key, value){
    try{
      this.connect()
      await this.client.set(`${key}`, `${value}`)
      console.log("Set success!")
      return true
    }catch(err){
      console.log("Set failed!", err.message)
      return false
    }
  }
}

module.exports = new Redis()