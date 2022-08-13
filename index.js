const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const cookieParser = require('cookie-parser')
const http = require('http')
const { Server } = require('socket.io')
const routerAuth = require('./src/routes/auth.route')
const routerAdmin = require('./src/routes/admin.route')
const routerUser = require('./src/routes/user.route')
const routerSearch = require('./src/routes/search.route')
const routerChat = require('./src/routes/chat.route')
const routerGroup = require('./src/routes/group.route')
const routerRequest = require('./src/routes/request.route')
const routerResponse = require('./src/routes/response.route')
const routerUpload = require('./src/routes/upload.route')
const ServiceChat = require('./src/services/Chat.service')

dotenv.config()
const app = express()
const httpServer = http.createServer(app)
const PORT = process.env.PORT || 5000
const io = new Server(httpServer, {
  cors: {
    origin: process.env.HOSTACCESS
  },
  maxHttpBufferSize: 1e8
})
global.__basedir = __dirname
global._io = io
global.__public = __dirname + "\\public"
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
  credentials: true,
  origin: process.env.HOSTACCESS
}))
app.use(cookieParser())
app.use('/static', express.static(path.join(__dirname, 'public/uploads')))

app.use('/auth', routerAuth)
app.use('/chat', routerChat)
global._io.on("connection", ServiceChat.connect)

app.use('/admin', routerAdmin)
app.use('/request', routerRequest)
app.use('/response', routerResponse)
app.use('/user', routerUser)
app.use('/group', routerGroup)
app.use('/search', routerSearch)
app.use('/upload', routerUpload)

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
