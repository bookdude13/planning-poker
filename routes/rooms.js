const express = require('express');
const router = express.Router();
const validator = require('express-validator');
let roomStorage = require('../app/roomStorage');

// Validations
const validateRoomId = validator.param('roomId').trim().isUUID(4);

/* GET planning rooms. */
router.get('/:roomId', [ validateRoomId ], (req, res, next) => {
  // Validation
  let errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Validation error: " + JSON.stringify(errors.array()));
    return res.status(404).render('error', { "message": "Room not found." });
  }

  // Get room
  var room;
  try {
    room = roomStorage.getRoom(req.params.roomId);
  } catch (err) {
    console.error("Failed room lookup: " + JSON.stringify(err));
    return res.status(404).render('error', { "message": "Room not found" });
  }

  // Return
  res.status(200).render('room', {
    'title': 'Room ' + room.room_name,
    'roomId': room.room_id
  });
});

module.exports = router;
