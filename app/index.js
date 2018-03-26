const express = require('express')
const addRequestId = require('express-request-id')();
const morgan = require('morgan')
const path = require('path')

const StreamLog = require("./StreamLog")

const app = express()

const morganFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :request_id'
const apache_log_port = 5101

morgan.token('request_id', function (req, res) { return req.id })

app.use(addRequestId);
app.use(morgan(morganFormat,{stream: new StreamLog(apache_log_port)}))



const PORT = process.env.PORT || 3000

app.get('/*', function (req, res) {
  res.sendStatus(200)
})



app.listen(PORT, function () {
  console.log(`My monolyte listen on ${PORT}`)
})
