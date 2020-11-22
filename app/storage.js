const config = require('../config');
const mysql = require('mysql');

var pool;
function getPool() {
    if (pool) return pool;
    pool = mysql.createPool({
        host: config.db.host,
        user: config.db.username,
        password: config.db.password,
        database: 'planningpoker'
    });
    return pool;
}

async function getConnection() {
    return new Promise((resolve, reject) => {
        let pool = getPool();
        pool.getConnection((err, connection) => {
            if (err) reject(err);
            resolve(connection);
        });
    });
}

async function query(query, args) {
    return new Promise((resolve, reject) => {
        getConnection()
            .then((connection) => {
                connection.query(query, args, (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            })
            .catch((err) => {
                reject(err);
            });
    });
}

module.exports = {
    query
};