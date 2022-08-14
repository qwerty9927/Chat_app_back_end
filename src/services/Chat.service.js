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
      // data structure
      /* 
        { 
          messageInfo: {
            idAuthor: ...,
            Message: ...,
            Image: ...,
            Time: ...
          },
          idRoom: ...
        } 
      */
      let fileInfo = null
      if(file){
        const path = __basedir + `\\public\\uploads\\imgs\\rooms\\${data.idRoom}`
        fileInfo = fileType(file)
        if(!fileInfo){
          callback({ message: !fileInfo ? "File not support" : "Upload done" })
          return 
        }
        // create file name
        const fileName = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + `${fileInfo.ext}`
  
        // add file name to message
        data.messageInfo.Image = fileName
  
        fs.writeFileSync(path + `\\${fileName}`, file, { flag: 'w' })
        
        fileInfo.link = process.env.HOST + `/static/imgs/rooms/${data.idRoom}/${fileName}`
      }
      try {
        socket.to("room-" + data.idRoom).emit("receiveMessage", data.messageInfo, fileInfo)
        callback({message: true})
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