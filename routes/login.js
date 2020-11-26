let Router = require('express');
let router = Router();
const validator = require('express-validator');
let playerStorage = require('../app/playerStorage');

// Validations
const validatePlayerName = validator.body('playerName').trim().isAlphanumeric().isLength({ min: 1, max: 64 });

/* GET login page. */
router.get('/', async (req, res) => {
  if (!req.session.player_id) {
    //req.session.player_id = 1;
  }

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

  res.redirect('/');
});

module.exports = router;
