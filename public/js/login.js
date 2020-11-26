$(document).ready(function() {
    $('#frm-login').submit((e) => {
        let messageElement = $('#login-message');
        
        // Check required elements
        let playerName = $('#player-name').val();
        if (playerName.length <= 0) {
            messageElement.text("Player name must be set.");
            e.preventDefault();
            return false;
        }

        // Continue
    });
});
