class SocketHandler {
    constructor(io) {
        this.io = io;
    }

    start() {
        console.log("starting");
        this.io.on('connection', (socket) => {
            console.debug('User connected');
            socket.on('disconnect', () => {
                console.debug('User disconnected');
            });
        });
    }
}

module.exports = SocketHandler;
