const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-shop-db',
    password: 'w4tchDC!iDa'
});

module.exports = pool.promise();