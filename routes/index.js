let Router = require('express');
let router = Router();

let playerStorage = require('../app/playerStorage');
let roomStorage = require('../app/roomStorage');

async function getPlayerOrGenerated(player_id) {
  var player = await playerStorage.getPlayer(player_id);
  if (player === null) {
    console.error("Failed to lookup player with id " + player_id);
    let generatedName = 'Player ' + Math.floor(Math.random() * 10000);
    console.error("Generating name " + generatedName);
    player = {
      'player_name': generatedName
    };
  }

  return player;
}

/* GET home page. */
router.get('/', async (req, res) => {
  // TODO get from login page
  if (!req.session.player_id) {
    req.session.player_id = 1;
  }

  let player = await getPlayerOrGenerated(req.session.player_id);
  let rooms = await roomStorage.getRooms();

  res.render('index', {
    title: 'Planning Poker',
    player: player,
    rooms: rooms,
  });
});

module.exports = router;
