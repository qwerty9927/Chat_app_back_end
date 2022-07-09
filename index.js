const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const http = require('http')
const { Server } = require('socket.io')
const routerAuth = require('./src/routes/auth.route')
const routerAdmin = require('./src/routes/admin.route')
const routerUser = require('./src/routes/user.route')
const routerChat = require('./src/routes/chat.route')
const routerSearch = require('./src/routes/search.route')
const ServiceChat = require('./src/services/Chat.service')
const verifyToken = require('./src/middleware/verifyToken')

dotenv.config()
const app = express()
const httpServer = http.createServer(app)
const PORT = process.env.PORT || 5000
const io = new Server(httpServer, {})
global.__basedir = __dirname
global._io = io

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}))
app.use(cookieParser())
app.use('/auth', routerAuth)
app.use(verifyToken) //middleware check token is exist
app.use('/chat', routerChat)

global._io.on("connection", ServiceChat.connect)

app.use('/admin', routerAdmin)
app.use('/user', routerUser)
app.use('/search', routerSearch)

app.use((req, res) => {
  res.status(404)
  res.json({status: 404, meg: "Not Found"})
})
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    status: err.status || 500,
    meg: err.message
  })
})

httpServer.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`)
})
