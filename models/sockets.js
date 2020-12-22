class Sockets {
	constructor(io) {
		this.io = io;
		this.socketEvents();
	}

	socketEvents() {
		this.io.on('connection', (socket) => {
			socket.on('message-for-server', (data) => {
				console.log('client emitted :', data);

				this.io.emit('message-for-client', data);
			});
		});
	}
}

module.exports = Sockets;
