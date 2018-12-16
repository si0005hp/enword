var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var fs = require('fs')
var os = require("os")
var https = require("https")
const readline = require('readline');


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/* Load existing words */
const words = []
const reader = readline.createInterface({ input: fs.createReadStream(`${__dirname}/words.list`, 'utf8') })
reader.on('line', line => words.push(line))
reader.on('close', () => console.log(`Loaded existing ${words.length} words.`))

/* API */
app.get('/', function (req, res, next) {
  res.json({ status: "ok", message: "I'm running." })
})

app.post('/word', (req, res) => {
  if (!req.body.word) {
    res.json({ status: "fail", message: 'Empry word passed.' })
    return
  }
  const line = req.body.word
  if (words.indexOf(line) >= 0) {
    res.json({ status: "fail", message: `Ignore ${line} as exist already.` })
    return
  }

  // Append to file
  fs.appendFile(`${__dirname}/words.list`, line + os.EOL, function (err) {
    if (err) {
      res.json({ status: "fail", message: err.message })
    } else {
      res.json({ status: "ok", message: line })
      console.log(line)
    }
  })
  // Append to memory
  words.push(line)
})

https
  .createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app)
  .listen(8000, function () {
    console.log('enword server up on port 8000...')
  })
