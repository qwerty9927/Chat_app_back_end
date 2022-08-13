const fs = require("fs")
const fileType = require('file-type-es5')
const ChatModel = require("../models/Chat.model")
const path = '../../public/uploads'
class ServiceChat {
  connect(socket) {
    console.log("connect to chat")
    socket.on("entryRoom", (data) => {
      socket.join("room-" + data.idRoom)
      console.log("room-" + data.idRoom)
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
     let linkFile = null
     if(file){
        const path = __basedir + `\\public\\uploads\\imgs\\rooms\\${data.idRoom}`
        const fileInfo = fileType(file)
        if(!fileInfo){
          callback({ message: fileInfo ? "File not support" : "Upload done" })
          return 
        }
        console.log(fileInfo)
        // create file name
        const fileName = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + `${fileInfo.ext}`
  
        // add file name to message
        data.messageInfo.Image = fileName
        console.log(data.messageInfo.Image)
  
        fs.writeFileSync(path + `\\${fileName}`, file, { flag: 'w' })
        
        linkFile = process.env.HOST + `/static/imgs/rooms/${data.idRoom}/${fileName}`
      }
      try {
        console.log(linkFile)
        console.log("room-" + data.idRoom)
        socket.to("room-" + data.idRoom).emit("receiveMessage", data.messageInfo, linkFile, async (response) => {
          console.log(response)
          if(response){
            // await ChatModel.addMessage(data.idRoom, data.messageInfo)
            callback({ message: true })
          } else {
            callback({ message: false })
          }
        }
        )
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