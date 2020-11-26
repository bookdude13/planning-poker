let storage = require('./storage');

async function getPlayer(playerId) {
  let player = await storage.query(
    "SELECT * FROM player WHERE player_id = ?",
    [ playerId ]
  )
  .then((players) => {
    return players.length > 0 ? players[0] : null
  })
  .catch((err) => {
    console.error(err);
    return null;
  });

  return player;
}

async function createPlayer(playerName) {
  let newPlayerId = await storage.query(
    "INSERT INTO player (player_name) VALUES (?)",
    [ playerName ]
  )
  .then((result) => {
    return result.insertId;
  })
  .catch((err) => {
    console.error(err);
    return null;
  });

  return newPlayerId;
}

module.exports = {
  getPlayer,
  createPlayer
}