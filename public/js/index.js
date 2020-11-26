$(document).ready(function() {
    let socket = io();

    $('#btn-create-room').click((e) => {
        let messageElement = $('#create-room-message');
        
        // Check required elements
        let roomName = $('#create-room-name').val();
        if (roomName.length <= 0) {
            messageElement.css('color', 'red');
            messageElement.text("Room name must be set.");
            return;
        }

        // Create
        let onSuccess = (data, textStatus, jqXHR) => {
            messageElement.css('color', 'black');
            messageElement.text("Room created.");
        };
        let onError = (jqXHR, textStatus, errorThrown) => {
            messageElement.css('color', 'red');
            messageElement.text("Failed to create room.");
        };
        $.ajax({
            url: "/rooms/create",
            method: "POST",
            accepts: "application/json",
            data: {
                "roomName": roomName
            },
            dataType: "json",
            success: onSuccess,
            error: onError,
            timeout: 3000
        });
    });
});
