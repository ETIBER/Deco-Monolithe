const net = require('net');


const  logHost = 'ec2-18-221-185-149.us-east-2.compute.amazonaws.com'
  , logPort = 5000
  , sender = require('os').hostname();

function getLogStream() {
	return new Promise((resolve,reject) => {
	const conn = net.createConnection({host: logHost, port: logPort}, function() {
		console.log('connected to server');
		resolve(conn)
		})
	conn.on('end', () => {
  		console.log('disconnected from server');
  		reject()
		});
	})
}

module.exports = {
	getLogStream
}
