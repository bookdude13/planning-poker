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

async function removePlayer(playerId) {
  await storage.query(
    "DELETE FROM player WHERE player_id = ?",
    [ playerId ]
  )
  .then((result) => {
    return true;
  })
  .catch((err) => {
    console.error(err);
    return false;
  });
}

async function updatePlayerRoom(playerId, roomId) {
  return storage.query(
    "UPDATE player SET current_room = ? WHERE player_id = ?",
    [ roomId, playerId ]
  );
}

module.exports = {
  getPlayer,
  createPlayer,
  removePlayer,
  updatePlayerRoom
}