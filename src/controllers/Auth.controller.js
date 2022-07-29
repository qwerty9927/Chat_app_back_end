const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const AuthModel = require('../models/Auth.model')
const UserModel = require('../models/User.model')

class Auth {
  async login(req, res, next) {
    if (req.body.Username !== undefined && req.body.Password !== undefined) {
      const username = req.body.Username
      const result = await AuthModel.checkAcc(req.body)
      if (result.status) {
        const accessToken = jwt.sign({ username: username, role: result.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60*10 })
        const refreshToken = jwt.sign({ username: username, role: result.role }, process.env.REFRESH_ACCESS_TOKEN_SECRET)
        if(await AuthModel.setToken(username, refreshToken)){
          res.cookie("accessToken", accessToken)
          res.cookie("refreshToken", refreshToken)
          res.status(200).json({ Username: username, Name: result.Name, Image: result.Image})
        } else {
          next(createError.InternalServerError())
        }
      } else {
        next(createError.Unauthorized())
      }
    } else {
      next(createError.UnprocessableEntity())
    }
  }

  async resgister(req, res, next) {
    let accountInfo = req.body // Username, Password, Name, Image
    accountInfo.Image = accountInfo.Image || "defaultImage.png"
    try{
      await AuthModel.createAcc(accountInfo)
      await UserModel.createTableFriend(accountInfo.Username)
      await UserModel.createTableRequest(accountInfo.Username)
      await UserModel.createTableGroupOfUser(accountInfo.Username)
      await UserModel.createTableRequestLog(accountInfo.Username)
      res.status(200).send("Success")
    } catch(err){
      next(err)
    }
  }

  async authenticate(req, res, next) {
    if (req.body.Username === undefined || /^$/.test(req.body.Username)) {
      next(createError.UnprocessableEntity())
      return false
    } else if (await AuthModel.isUsername(req.body.Username)) {
      next(createError.Conflict())
      return false
    }

    if (req.body.Password === undefined || /^.{0,7}$/.test(req.body.Password)) {
      next(createError.UnprocessableEntity())
      return false
    }

    if (req.body.Name === undefined || /^$/.test(req.body.Name)) {
      next(createError.UnprocessableEntity())
      return false
    }
    next()
  }

  refreshToken(req, res, next) {
    const token = req.cookies.refreshToken
    console.log("RefreshToke: ", token)
    if (token !== undefined) {
      jwt.verify(token, process.env.REFRESH_ACCESS_TOKEN_SECRET, async (err, data) => {
        if (data) {
          const refreshTokenInStore = await AuthModel.getToken(data.username)
          if(refreshTokenInStore.result === token){
            const accessToken = jwt.sign({ username: data.username, role: data.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60*10 })
            res.cookie("accessToken", accessToken)
            res.status(200).send("Success")
          } else {
            next(createError.Unauthorized())
          }
        } else {
          next(createError.Unauthorized())
        }
      })
    } else {
      next(createError.Unauthorized())
    }
  }

  async logout(req, res, next) {
    const token = req.cookies.refreshToken
    if(token !== undefined){
      jwt.verify(token, process.env.REFRESH_ACCESS_TOKEN_SECRET, async (err, data) => {
        if(data && await AuthModel.delToken(data.username)){
          res.cookie("accessToken", "")
          res.cookie("refreshToken", "")
          res.status(200).send("Logout done")
        } else {
          next(createError.Unauthorized())
        }
      })
    } else {
      next(createError.Unauthorized())
    }
  }
}

module.exports = new Auth()
