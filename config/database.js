const { createPool } = require("mysql");

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'pravo'
});

module.exports = pool;
