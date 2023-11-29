const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    database: 'authentication',
    user: 'root', 
    password: 'mjina0303'
});

module.exports = pool;