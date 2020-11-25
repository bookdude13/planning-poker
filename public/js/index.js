$(document).ready(function() {
    let socket = io();

    $('#btn-new-room').click(function(eventObject) {
        socket.emit('new room');
    });
});
