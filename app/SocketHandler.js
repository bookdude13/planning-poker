class SocketHandler {
    constructor(io) {
        this.io = io;
    }

    start() {
        console.log("starting");
        this.io.on('connection', (socket) => {
            console.log('User connected');
            socket.on('disconnect', () => {
                console.log('User disconnected');
            });
        });
    }
}

module.exports = SocketHandler;
