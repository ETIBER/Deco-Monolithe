const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('combined'))   

const PORT = process.env.PORT || 3000

app.get('/app1', function (req, res) {
  res.send('1')
})
app.get('/app2', function (req, res) {
  res.send('2')
})
app.get('/app3', function (req, res) {
  res.send('3')
})
app.get('/app4', function (req, res) {
  res.send('4')
})
app.get('/app5', function (req, res) {
  res.send('5')
})

app.listen(PORT, function () {
  console.log(`My monolyte listen on ${PORT}`)
})
