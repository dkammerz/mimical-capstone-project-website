
const next = require('next');
const express = require('express');
const mysql = require('mysql');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const dotenv = require('dotenv');
dotenv.config({ path: '.process.env' });

// Create connection to database
var db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

// Create connection to server
const server = express();

//Connect 
app.prepare().then(() => {

    // Connect to server
    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(3000, err => {
        if (err) throw err;
        console.log('> Server is ready on http://localhost:3000');
    })

    // Connect to database
    db.connect((err) => {
        if (err) {
            throw err;
        }
        console.log('Connected to database');
    });


}).catch(ex => {
    console.error(ex.stack);
    process.exit(1);
});

const getpatients = () => {
    server.get((req, res) => {
        let sql = 'SELECT * FROM patients';
        let query = db.query(sql, (err, results) => {
            if (err) throw err;
            console.log(results);
            res.send(results);

        });
    });
}

module.exports = { getpatients };
