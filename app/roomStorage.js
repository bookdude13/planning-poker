let { v4: uuidv4 } = require('uuid');
let storage = require('./storage');

async function getRooms() {
  let rooms = await storage.query("SELECT * FROM room", {});
  return rooms;
}

async function getRoom(roomId) {
  let rooms = await storage.query(
    "SELECT * FROM room WHERE room_id = ?",
    [ roomId ]
  );

  return rooms.length > 0 ? rooms[0] : null;
}

async function createRoom(roomName, adminPlayerId) {
  // Try to get room
  let rooms = await storage.query(
    "SELECT room_id FROM room WHERE room_name = ? AND admin_id = ?",
    [roomName, adminPlayerId]
  );
  if (rooms.length > 0) {
    console.log("Room already exists");
    return rooms[0].room_id;
  }

  // Add room
  let roomId = uuidv4();
  let result = await storage.query(
    "INSERT INTO room (room_id, room_name, admin_id) VALUES (?)",
    [
      [roomId, roomName, adminPlayerId]
    ]
  );

  console.log(result);
  if (result.affectedRows !== 1) {
    return null;
  }
  return roomId;
}

module.exports = {
  getRooms,
  getRoom,
  createRoom
}