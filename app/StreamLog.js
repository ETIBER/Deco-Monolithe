const { Writable } = require('stream');
const logStashConnector = require("./logStashConnector")

module.exports = class StreamLog extends Writable {
	constructor(logPort) {
		super()
		const that = this
		logStashConnector.getLogStream(logPort).then((logStream)=> {
			that.logStream = logStream
		})
	} 
  	write(chunk, encoding, callback) {
  		if(this.logStream !== undefined) {
  			this.logStream.write(chunk.toString())
  		}
	}
}