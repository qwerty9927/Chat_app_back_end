const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, {})

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

  io.on('connection', (socket) => {
    socket.emit("message", "Connected success")
    socket.on("chatMessage", (data) => {
      console.log(data)
    })
  })
httpServer.listen(5500);