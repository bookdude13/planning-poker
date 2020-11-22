var express = require('express');
var router = express.Router();

/* GET planning rooms. */
router.get('/:roomId', function(req, res, next) {
  res.send('respond with a room. ' + req.params.roomId);
});

module.exports = router;
