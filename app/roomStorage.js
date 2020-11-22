let storage = require('./storage');

function getRooms() {
  let pool = storage.getPool();
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query('SELECT 1+1', (err, rows) => {
      if (err) throw err;
      console.log(rows);
    })
  })
}

module.exports = {
  getRooms
}