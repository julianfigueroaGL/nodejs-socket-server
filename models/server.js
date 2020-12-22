const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.server = http.createServer(this.app);

		this.io = socketIo(this.server, {});
	}

	middlewares() {
		this.app.use(express.static(path.resolve(__dirname, '../public/')));
		this.app.use(cors());
	}

	initSockets() {
		new Sockets(this.io);
	}

	execute() {
		this.middlewares();
		this.initSockets();

		this.server.listen(this.port, () => {
			console.log(`Server running on port: ${this.port}`);
		});
	}
}

module.exports = Server;
