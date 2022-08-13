const fs = require("fs")
const fileType = require('file-type-es5')
const ChatModel = require("../models/Chat.model")
const path = '../../public/uploads'
class ServiceChat {
  connect(socket) {
    console.log("connect to chat")
    socket.on("entryRoom", (data) => {
      socket.join("room-" + data.idRoom)
    })

    socket.on("sendMessage", async (data, file, callback) => {
      try {
        // await ChatModel.addMessage(data.idRoom, data.messageInfo)
        const path = __basedir + `\\public\\uploads\\imgs\\${data.idRoom}`
        const fileInfo = fileType(file)
        console.log(fileInfo)
        const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + `${data.username}.${fileInfo.ext}`
        if (!fs.existsSync(path)) {
          fs.mkdirSync(path)
        }
        if (file) {
          fs.writeFile(path + `\\${filename}`, file, { flag: 'w' }, (err) => {
            callback({ message: err ? "failure" : "success" })
          })
        }
        socket.to("room-" + data.idRoom).emit("receiveMessage", data.messageInfo)
      } catch (e) {
        console.log(e)
      }
    })

    socket.on("disconnect", () => {
      console.log("Disconnect")
    })
  }
}

module.exports = new ServiceChat()