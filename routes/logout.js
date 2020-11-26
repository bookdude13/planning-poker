let Router = require('express');
let router = Router();
let playerStorage = require('../app/playerStorage');
const roomStorage = require('../app/roomStorage');

/* GET do logout, redirect to login.
 * Doing GET instead of POST because redirection to a logout page is easy */
router.get('/', async (req, res) => {
  let oldPlayerId = req.session.player_id;

  // Clean up database
  await roomStorage.reassignAdminOnLogout(oldPlayerId);
  await playerStorage.removePlayer(oldPlayerId);
  
  req.session.destroy((err) => {
    if (err) console.error(err);
    res.redirect('/login');
  });
});

module.exports = router;
