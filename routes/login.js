let Router = require('express');
let router = Router();
const validator = require('express-validator');
let playerStorage = require('../app/playerStorage');

// Validations
const validatePlayerName = validator.body('playerName').trim().isAlphanumeric().isLength({ min: 1, max: 64 });

/* GET login page. */
router.get('/', async (req, res) => {
  res.render('login', {
    title: "Login",
    loginMessage: ""
  });
});

/* POST do login, redirect to root */
router.post('/', [ validatePlayerName ], async (req, res) => {
  let errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    console.error("Validation error: " + JSON.stringify(errors.array()));
    return res.status(400).render('login', {
      title: "Login",
      loginMessage: "Player name must be an alphanumeric string no more than 64 characters long."
    });
  }

  playerStorage.createPlayer(req.body.playerName)
  .then((newPlayerId) => {
    if (newPlayerId === null) {
      return res.status(500).render('login', {
        title: "Login",
        loginMessage: "Failed to create player. Please try again."
      });
    }

    req.session.player_id = newPlayerId;
    return res.redirect('/');
  })
  .catch((err) => {
    console.error(err);
    return res.status(500).render('login', {
      title: "Login",
      loginMessage: "Failed to create player. Please try again."
    })
  });
});

module.exports = router;
