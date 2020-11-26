let Router = require('express');
let router = Router();
const validator = require('express-validator');
let playerStorage = require('../app/playerStorage');

/* GET do logout, redirect to login.
 * Doing GET instead of POST because redirection to a logout page is easy */
router.get('/', async (req, res) => {
  let oldPlayerId = req.session.player_id;
  delete req.session.player_id;

  // Clean up database
  await playerStorage.removePlayer(oldPlayerId);

  return res.redirect('/login');
});

module.exports = router;
