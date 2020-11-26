const express = require('express');
const router = express.Router();
const validator = require('express-validator');
let roomStorage = require('../app/roomStorage');

// Validations
const validateRoomId = validator.param('roomId').trim().isUUID(4);
const validateRoomName = validator.body('roomName').trim().isLength({ min: 1 }).isAlphanumeric();

/* GET planning rooms. */
router.get('/:roomId', [ validateRoomId ], (req, res, next) => {
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

/* POST create room */
router.post('/create', [ validateRoomName ], (req, res, next) => {
  let errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Validation error: " + JSON.stringify(errors.array()));
    return res.status(400).render('error', { "message": "Failed to create room." });
  }

  console.log("Creating room");
  let roomName = req.body.roomName;
  roomStorage.createRoom(roomName, req.session.player_id)
    .then((newRoomId) => {
      return res.status(200).json({
        roomId: newRoomId
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        message: "Failed to create room"
      })
    });
});

module.exports = router;
