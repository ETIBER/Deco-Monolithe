const net = require('net');


const  logHost = 'ec2-18-221-185-149.us-east-2.compute.amazonaws.com'
  , sender = require('os').hostname();

function getLogStream(logPort) {
	return _connect(logPort).then((conn) => {
	  	return conn
	})
}

function _connect(logPort) {
	console.log("try to connect")
	return new Promise((resolve,reject) => {
		const conn = net.createConnection({host: logHost, port: logPort}, function() {
			console.log(`connected to server ${logHost}:${logPort}`)
			resolve(conn)
		})
		conn.on('error', () => {
			console.log(`error during connection to ${logHost}:${logPort}`);
		})
		conn.on('end', () => {
	  		console.log('disconnected from server');
	  	})
		return conn
	})
}



module.exports = {
	getLogStream
}
