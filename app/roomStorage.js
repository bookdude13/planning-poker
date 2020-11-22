let storage = require('./storage');

async function getRooms() {
  let rooms = await storage.query("SELECT * FROM room", {});
  console.log(rooms);
  return rooms;
}

module.exports = {
  getRooms
}