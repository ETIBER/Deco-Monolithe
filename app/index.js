const express = require('express')
var addRequestId = require('express-request-id')();
const morgan = require('morgan')
const path = require('path')

const StreamLog = require("./StreamLog")

const app = express()

morgan.token('request_id', function (req, res) { return req.id })

app.use(morgan('combined',{stream: new StreamLog()}))



const PORT = process.env.PORT || 3000

app.get('/*', function (req, res) {
  res.sendStatus(200)
})



app.listen(PORT, function () {
  console.log(`My monolyte listen on ${PORT}`)
})
