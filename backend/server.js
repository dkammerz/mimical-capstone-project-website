

// FUNCTIONS:
// Import Next and Express as a requirement for the backend
// BodyParser is used to parse the body of the request 
const nextJS = require('next');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const db = require('./db');
const mysqlStore = require('express-mysql-session')(expressSession);
const expressRouter = require('express').Router();


//mySQL dependency
const dev = process.env.NODE_ENV !== 'production';
const app = nextJS({ dev });
const handle = app.getRequestHandler();

// Generate random ID
const { v4: uuidv4 } = require('uuid');
let myuuid = uuidv4();

// Create connection to server
const server = express();
const router = express.Router();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));
server.use(cookieParser(process.env.MYSECRETKEY));


const options = {
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    createDatabaseTable: true

}

const sessionStore = new mysqlStore(options);


server.use(expressSession({ //Setting a cookie for 1 hour
    secret: process.env.MYSECRETKEY,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { maxAge: 3600000 }
}))
require('./passportConfig')(passport);
server.use(passport.initialize());
server.use(passport.session());


;
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

server.post("/api/login", (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {

        if (err) {
            console.log(err);
        }
        if (!user) {
            console.log('There is no user with that email')
            res.send(true);
        }
        req.login(user, err => {
            res.send(false);
        })
    })
        (req, res, next);
});

server.post('/api/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) throw err;
        res.redirect('/login');
    });
    (req, res, next);
});

server.get("/api/getUser", (req, res) => {
    res.send(req.user);
});

server.get("/api/authenticate", (req, res) => {
    req.isAuthenticated() ? res.send(true) : res.send(false);
});

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
    var sql = 'INSERT INTO patients (name, prename, age, gender, birthdate, email, interests, diagnose, affectedSide, limitations, numbness, therapistID) VALUES (' + JSON.stringify(data.name) + ', ' + JSON.stringify(data.prename) + ', ' + data.age + ', ' + JSON.stringify(data.gender) + ', ' + JSON.stringify(data.birthdate) + ', ' + JSON.stringify(data.email) + ', ' + JSON.stringify(data.interests) + ', ' + JSON.stringify(data.diagnose) + ', ' + JSON.stringify(data.affectedSide) + ', ' + JSON.stringify(data.limitations) + ', ' + JSON.stringify(data.numbness) + ', 0)';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});


// Get Therapist Data
server.get("/api/therapist-data", (req, res) => {
    let sql = 'SELECT * FROM therapist';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Debugging

server.post('/debug', async (req, res) => {
    const password = req.body;
    console.log(password)

    try {
        const valid = await bcrypt.hash(password, 10);
        console.log(valid);
    } catch (err) {
    }
});