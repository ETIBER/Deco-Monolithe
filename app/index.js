const express = require('express')
const addRequestId = require('express-request-id')();
const morgan = require('morgan')
const path = require('path')

const StreamLog = require("./StreamLog")

const PORT = process.env.PORT || 3000
const APACHE_LOG_PORT = process.env.APACHE_LOG_PORT || 5101
const APPLICATION_LOG_PORT = process.env.APPLICATION_LOG_PORT || 5200

const app = express()

const morganFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :request_id'

morgan.token('request_id', function (req, res) { return req.id })

app.use(addRequestId);
app.use(morgan(morganFormat,{stream: new StreamLog(APACHE_LOG_PORT)}))

const applicationLogStream = new StreamLog(APPLICATION_LOG_PORT)

app.get('/XMLrequestConsumer', function (req, res) {
	const log = {
		request_id: req.id,
		operation: "plafondSolde"
	}
	applicationLogStream.write(Buffer.from(JSON.stringify(log)+"\n"))
	res.sendStatus(200)
})

app.get('/apiEndPoint', function (req, res) {
	const log = {
		request_id: req.id,
		operation: "virement_interne"
	}
	applicationLogStream.write(Buffer.from(JSON.stringify(log)+"\n"))
	res.sendStatus(200)
})

app.get('/services', function (req, res) {
  res.sendStatus(200)
})

app.get('/services/consultation_solde/*', function (req, res) {
  	const log = {
		request_id: req.id,
		operation: "consultation_solde"
	}
	applicationLogStream.write(Buffer.from(JSON.stringify(log)+"\n"))
	res.sendStatus(200)
})

app.get('/api/carteService/*', function (req, res) {
  	const log = {
		request_id: req.id,
		operation: "opposition_carte"
	}
	applicationLogStream.write(Buffer.from(JSON.stringify(log)+"\n"))
	res.sendStatus(200)
})

app.listen(PORT, function () {
  console.log(`My monolyte listen on ${PORT}`)
})
