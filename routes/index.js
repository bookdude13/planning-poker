let Router = require('express');
let router = Router();

let roomStorage = require('../app/roomStorage');

/* GET home page. */
router.get('/', function(req, res, next) {
  const rooms = roomStorage.getRooms();
  res.render('index', {
    title: 'Planning Poker',
    rooms: rooms
  });
});

module.exports = router;
