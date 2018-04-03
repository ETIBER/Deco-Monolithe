const net = require('net');

const  logHost = 'logstash'
  , sender = require('os').hostname();

function getLogStream(logPort) {
	return _connect(logPort).then((conn) => {
	  	return conn
	})
}

function _connect(logPort) {
	return new Promise((resolve,reject) => {
    const conn = net.createConnection({host: logHost, port: logPort}, function() {
      console.log(`connected to server ${logHost}:${logPort}`)
      resolve(conn);
    })
    conn.on('error', () => {
      console.log(`error during connection to ${logHost}:${logPort}`);
      setTimeout(function() {
        console.log(`retry`);
        resolve (_connect(logPort));
      }, 2000);
    })
    conn.on('end', () => {
        console.log('disconnected from server');
      })
  })
}




module.exports = {
	getLogStream
}
