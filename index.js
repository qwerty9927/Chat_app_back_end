const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const routerAuth = require('./src/routes/auth.route')
const routerAdmin = require('./src/routes/admin.route')
const routerUser = require('./src/routes/user.route')
const verifyToken = require('./src/middleware/verifyToken')
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}))
app.use(cookieParser())

app.use('/auth', routerAuth)

app.use(verifyToken) //middleware check token is exist
app.use('/admin', routerAdmin)
app.use('/user', routerUser)

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

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`)
})
