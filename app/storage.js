const config = require('../config');
const mysql = require('mysql');

var pool;
module.exports = {
    getPool: function() {
        if (pool) return pool;
        pool = mysql.createPool({
            host: config.db.host,
            user: config.db.username,
            password: config.db.password,
            database: 'planningpoker'
        });
        return pool;
    }
}