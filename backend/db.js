// Description: This file is used to connect to the database

const mysql = require('mysql');
const dotenv = require('dotenv');


// mySQL password masking
dotenv.config({ path: '.process.env' });

// Create connection to database
var db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

module.exports = db;