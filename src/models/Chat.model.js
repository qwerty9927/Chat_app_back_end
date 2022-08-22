const DB = require("./DB.model")

class ChatModel extends DB{
  async addMessage(room, message){
    try{
      const sql = `Insert into friend_message_${room} 
        (idAuthor, Message, Image, Time) 
        Values ('${message.idAuthor}', '${message.Message}', '${message.Image}', '${message.Time}')`
      await this.excuseQuery(sql)
    } catch(e){
      console.log(e)
      throw e.message
    }

  }

  async getMessage(room, page, quantity){
    const sql = `Select * from friend_message_${room} Order by idMessage DESC Limit ${page*quantity}, ${quantity}`
    try{
      const messageOfQuery = await this.excuseQuery(sql)
      return {messageOfQuery}
    } catch(e){
      console.log(e)
      throw e.message
    }
  }

}

module.exports = new ChatModel()