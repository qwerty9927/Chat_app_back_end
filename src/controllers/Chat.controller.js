
class Chat{
  chatPage(req, res){
    res.sendFile(__basedir + '/index.html')
  }
}

module.exports = new Chat