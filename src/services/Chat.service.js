const ChatModel = require("../models/Chat.model")

class ServiceChat{
  connect(socket){
    console.log("connect to chat")
    socket.on("entryRoom", (data) => {
      socket.join("room-" + data.idRoom) 
    })

    socket.on("sendMessage", async (data) => {
      try{
        await ChatModel.addMessage(data.idRoom, data.messageInfo)
        socket.to("room-" + data.idRoom).emit("receiveMessage", data.messageInfo)
      } catch(e){
        console.log(e)
      }
    })

    socket.on("disconnect", () => {
      console.log("Disconnect")
    })
  }
}

module.exports = new ServiceChat()