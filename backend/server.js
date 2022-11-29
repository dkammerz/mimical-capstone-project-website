
const next = require('next');
const express = require('express');
const bodyParser = require('body-parser');

//mySQL dependency
const mysql = require('mysql');


const dev = process.env.NODE_ENV !== 'production';


const app = next({ dev });
const handle = app.getRequestHandler();

const router = express.Router();

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
server.use(bodyParser.json());

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

// API Routes

// Get Patient Data
server.get("/api/patient-data", (req, res) => {
    let sql = 'SELECT * FROM patients';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Add Patient Data

server.post("/api/add-patient", (req, res) => {
    let data = req.body;
    // console.log(data.birthdate);
    var sql = 'INSERT INTO patients (Name, Prename, ID, Age, Gender, Birthday, Email, Interests, Diagnose, AffectedSide, Limitations, Numbness, TherapisID) VALUES (' + '"' + data.name + '"' + ', ' + '"' + data.prename + '"' + ', ' + data.id + ', ' + data.age + ', ' + '"' + data.gender + '"' + ', ' + '"' + data.birthdate + '"' + ', ' + '"' + data.email + '"' + ', ' + '"' + data.interests + '"' + ', ' + '"' + data.diagnose + '"' + ', ' + '"' + data.affectedSide + '"' + ', ' + '"' + data.limitations + '"' + ', ' + '"' + data.numbness + '"' + ', 0)';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
});