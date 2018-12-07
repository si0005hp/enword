var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var fs = require('fs')
var os = require("os")
var https = require("https")

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res, next) {
  res.json({ status: "ok", message: "I'm running." })
})

app.post('/word', (req, res) => {
  if (!req.body.word) {
    res.json({ status: "fail", message: 'Empry word passed.' })
    return
  }

  const line = `${req.body.word}:${req.body.definition}`
  fs.appendFile(`${__dirname}/words.list`, line + os.EOL, function (err) {
    if (err) {
      res.json({ status: "fail", message: err.message })
    } else {
      res.json({ status: "ok", message: line })
    }
  })
})

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
.listen(8000, function () {
  console.log('enword server up on port 8000...')
})
