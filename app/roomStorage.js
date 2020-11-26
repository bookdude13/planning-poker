let { v4: uuidv4 } = require('uuid');
let storage = require('./storage');

async function getRooms() {
  let rooms = await storage.query("SELECT * FROM room", {});
  console.log(rooms);
  return rooms;
}

async function createRoom(roomName, adminPlayerId) {
  // Try to get room
  let room = await storage.query(
    "SELECT room_id FROM room WHERE room_name = ? AND admin_id = ?",
    [roomName, adminPlayerId]
  );
  if (room.length > 0) {
    console.log("Room already exists");
    return room.room_id;
  }

  // Add room
  let result = await storage.query(
    "INSERT INTO room (room_id, room_name, admin_id) VALUES (?)",
    [
      [uuidv4(), roomName, adminPlayerId]
    ]
  );
  return result.insertId;
}

module.exports = {
  getRooms,
  createRoom
}