const mysql = require('mysql')
const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "chat_app"
}
module.exports = class DB {
  constructor(){
    this.con = mysql.createConnection(config)
  }

  excuseQuery(sql){
    return new Promise((resolve, reject) => {
      this.con.query(sql, (err, data) => {
        console.log(sql)
        if(err){
          reject(err)
        }
        resolve(data)
      })
    })
  }

  select(table, select = '*', where = ''){
    return new Promise((resolve, reject) => {
      let sql = `SELECT ${select} FROM ${table} ${where}`
      this.con.query(sql, (err, data) => {
        if(err) return reject(err)
        return resolve(data)
      })
    })
  }

  insert(table, data){
    let fields = ""
    let values = ""
    Object.keys(data).forEach( item => {
      fields += `${item},`
    })
    fields = fields.slice(0, -1)
    Object.values(data).forEach( item => {
      values += `'${item}',`
    })
    values = values.slice(0, -1)
    let sql = `INSERT INTO ${table} (${fields}) VALUES (${values})`
    console.log(sql)
    return new Promise((resolve, reject) => {
      this.con.query(sql, (err, data) => {
        if(err) {
          reject(false)
        }else {
          resolve(true)
        }
      })
    })
  }

}

