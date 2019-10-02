var mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

let db = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    port     : process.env.DB_PORT,
    database : process.env.DB_NAME
});

const pool = db.promise();

module.exports = pool;