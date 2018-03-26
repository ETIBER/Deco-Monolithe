const net = require('net');


const  logHost = 'ec2-18-221-185-149.us-east-2.compute.amazonaws.com'
  , sender = require('os').hostname();

function getLogStream(logPort) {
	return new Promise((resolve,reject) => {
	const conn = net.createConnection({host: logHost, port: logPort}, function() {
		console.log(`connected to server ${logHost}:${logPort}`);
		resolve(conn)
		})
	conn.on('error', () => {
  		console.log(`error during connection to ${logHost}:${logPort}`);
  		reject()
		});
	conn.on('end', () => {
  		console.log('disconnected from server');
  		reject()
		});
	})
}

module.exports = {
	getLogStream
}
