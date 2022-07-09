
class ServiceChat{
  connect(socket){
    console.log("connect to chat")
    socket.emit("message", "connecting")
    socket.on("disconnect", () => {
      console.log("Disconnect")
    })

    socket.on('chat message', (data) => {
      console.log(data)
      _io.emit('chat message', data)

    })
  }
}

module.exports = new ServiceChat()