const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('combined'))   

const PORT = process.env.PORT || 3000

app.get('/*', function (req, res) {
  res.sendStatus(200)
})

app.listen(PORT, function () {
  console.log(`My monolyte listen on ${PORT}`)
})
