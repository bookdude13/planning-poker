const config = require('../config');
const mysql = require('mysql');

var pool;
function getPool() {
    if (pool) return pool;
    pool = mysql.createPool({
        connectionLimit: 10,
        host: config.db.host,
        user: config.db.username,
        password: config.db.password,
        database: 'planningpoker'
    });
    return pool;
}

async function query(query, args) {
    return new Promise((resolve, reject) => {
        let pool = getPool();
        pool.query(query, args, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    query
};