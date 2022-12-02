

// FUNCTIONS:
// Import Next and Express as a requirement for the backend
// BodyParser is used to parse the body of the request 
const next = require('next');
const express = require('express');
const app = next({ dev });
const handle = app.getRequestHandler();
const bodyParser = require('body-parser');


//mySQL dependency
const mysql = require('mysql');
const dev = process.env.NODE_ENV !== 'production';

// mySQL password masking
const dotenv = require('dotenv');
dotenv.config({ path: '.process.env' });

// Create connection to database
var db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});


const router = express.Router();


// Generate random ID
const { v4: uuidv4 } = require('uuid');
let myuuid = uuidv4();

// Create connection to server
const server = express();
server.use(bodyParser.json());
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




// Databse Routes

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
    var sql = 'INSERT INTO patients (Name, Prename, ID, Age, Gender, Birthdate, Email, Interests, Diagnose, AffectedSide, Limitations, Numbness, TherapistID) VALUES (' + JSON.stringify(data.name) + ', ' + JSON.stringify(data.prename) + ', ' + JSON.stringify(myuuid) + ', ' + data.age + ', ' + JSON.stringify(data.gender) + ', ' + JSON.stringify(data.birthdate) + ', ' + JSON.stringify(data.email) + ', ' + JSON.stringify(data.interests) + ', ' + JSON.stringify(data.diagnose) + ', ' + JSON.stringify(data.affectedSide) + ', ' + JSON.stringify(data.limitations) + ', ' + JSON.stringify(data.numbness) + ', 0)';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Therapist Account Creation
server.post("/api/add-therapist", (req, res) => {
    let data = req.body;
    var sql = 'INSERT INTO therapists (Name, Prename, Email, Password) VALUES (' + myuuid + ', ' + JSON.stringify(data.name) + ', ' + JSON.stringify(data.prename) + ', ' + JSON.stringify(data.company) + ',' + JSON.stringify(data.email) + ', ' + JSON.stringify(data.password) + ')';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
});

// Get Therapist Data
server.get("/api/therapist-data", (req, res) => {
    let sql = 'SELECT * FROM therapists';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});