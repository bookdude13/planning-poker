let storage = require('./storage');

async function getPlayer(player_id) {
  let player = await storage.query(
    "SELECT * FROM player WHERE player_id = ?",
    {
      "player_id": player_id
    }
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

module.exports = {
  getPlayer
}