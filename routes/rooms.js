const express = require('express');
const router = express.Router();
const validator = require('express-validator');

// Validations
const validateRoomId = validator.param('roomId').trim().isUUID(4);

/* GET planning rooms. */
router.get('/:roomId', [ validateRoomId ], (req, res, next) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Validation error: " + JSON.stringify(errors.array()));
    return res.status(404).render('error', { "message": "Room not found." });
  }

  res.status(200).render('room', {
    'title': 'Room ' + req.params.roomId,
    'roomId': req.params.roomId
  });
});

module.exports = router;
