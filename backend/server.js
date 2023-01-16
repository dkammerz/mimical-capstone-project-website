
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
const cookie = require('js-cookie');
const db = require('./db');
const mysqlStore = require('express-mysql-session')(expressSession);

const dev = process.env.NODE_ENV !== 'production';

// Start NextJS through Express
const app = nextJS({ dev, hostname: 'localhost', port: 3000 });
const handle = app.getRequestHandler();

// Generate random ID
const { v4: uuidv4 } = require('uuid');
let myuuid = uuidv4();

// Create connection to server
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));
server.use(cookieParser(process.env.MYSECRETKEY));

// Session Logs in the database
const options = {
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    createDatabaseTable: true
}
const sessionStore = new mysqlStore(options);

//Setting a cookie
server.use(expressSession({
    secret: process.env.MYSECRETKEY,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    store: sessionStore,
    cookie: { maxAge: 3600000 }
}))

// Passport Config initailization
require('./passportConfig')(passport);
server.use(passport.initialize());
server.use(passport.session());

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

// Debugging

server.post('/debug-1', async (req, res) => {
    const password = req.body;
    console.log("this is the pw " + password.password)

    const valid = await bcrypt.hash(password.password, 12);
    console.log("this is the hashed pw " + valid);
});

server.post('/debug-2', async (req, res) => {
    var temp_uuid = JSON.stringify(myuuid);
    console.log("this is the uuid " + temp_uuid);
    var short_uuid = temp_uuid.substring(1, 14);
    console.log("this is the short uuid " + short_uuid);
});


// API Routes

server.post("/api/login", (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {

        if (err) {
            console.log(err);
        }
        if (!user) {
            res.send(true);
        }
        req.login(user, err => {
            // cookie.set('loggedin', user);
            res.send(false);
        })
    })
        (req, res, next);
});

server.post('/api/logout', function (req, res, next) {
    req.logout(function (err) {
        req.session.destroy(function (err) {
            if (!err) {
                res.status(200).clearCookie('connect.sid', { path: '/' }).json({ status: "Success" });
            } else {
                throw err;
            }
        });
    });
});

server.get("/api/getUser", (req, res) => {
    res.send(req.user);
});

server.get("/api/authenticate", (req, res) => {
    req.isAuthenticated() ? res.send(true) : res.send(false);
});

// Get Patient User-Specific Data
server.get("/api/patient-data", (req, res) => {
    let user = req.user;
    const sql = 'SELECT * FROM patients WHERE therapistID = ' + JSON.stringify(user[3]);
    // let sql = 'SELECT * FROM patients';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Add Patient via provided key
server.post("/api/check-patient-key-from-dashboard", (req, res) => {
    let data = req.body;

    function getDateHelper(a) {
        if (a < 10) {
            return "0" + a;
        } else {
            return a;
        }
    }

    // Check if key is valid
    var today = new Date(), time = JSON.stringify(today.getFullYear() + "-" + getDateHelper(today.getMonth() + 1) + "-" + getDateHelper(today.getDate()) + " " + getDateHelper(today.getHours()) + ':' + getDateHelper(today.getMinutes()) + ':' + getDateHelper(today.getSeconds()));
    var currentTime = time;
    var sql = 'UPDATE patients SET therapistAddKey = NULL, expirationDateKey = NULL WHERE expirationDateKey < ' + currentTime;
    var query = db.query(sql, (err, results) => {
        if (err) throw err;
    });

    // If key is valid, add send back patient data
    var sql = 'SELECT * FROM patients WHERE therapistAddKey = ' + JSON.stringify(data.key);
    var query = db.query(sql, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.send({ name: results[0].name, prename: results[0].prename, ID: results[0].ID, gender: results[0].gender, birthdate: results[0].birthdate, email: results[0].email });
        } else {
            res.send("nothing");
        }
    });
});

// Add Patient Data
server.post("/api/add-patient", (req, res) => {
    let data = req.body;
    let therapitstID = req.user;
    var sql = 'UPDATE patients SET interests = ' + JSON.stringify(data.interestsSend) + ', diagnose = ' + JSON.stringify(data.diagnoseSend) + ', affectedSide = ' + JSON.stringify(data.affectedSideSend) + ', limitations = ' + JSON.stringify(data.motionSend) + ', numbness = ' + JSON.stringify(data.numbnessSend) + ', therapistID = ' + JSON.stringify(therapitstID[3]) + ' WHERE (ID = ' + JSON.stringify(data.ID) + ')';
    var query = db.query(sql, (err, results) => {
        if (err) throw err;
    });

    var sql = 'UPDATE patients SET therapistAddKey = NULL, expirationDateKey = NULL WHERE ID = ' + JSON.stringify(data.ID);
    var query = db.query(sql, (err, results) => {
        if (err) throw err;
    });
    res.redirect('/');
});

server.post("/api/change-patient-data", (req, res) => {
    let data = req.body;
    let therapitstID = req.user;
    var sql = 'UPDATE patients SET interests = ' + JSON.stringify(data.interestsSend) + ', diagnose = ' + JSON.stringify(data.diagnoseSend) + ', affectedSide = ' + JSON.stringify(data.affectedSideSend) + ', limitations = ' + JSON.stringify(data.motionSend) + ', numbness = ' + JSON.stringify(data.numbnessSend) + ', therapistID = ' + JSON.stringify(therapitstID[3]) + ' WHERE (ID = ' + JSON.stringify(data.ID) + ')';
    var query = db.query(sql, (err, results) => {
        if (err) throw err;
    });
    res.redirect('/login');
});

server.post("/api/get-comments", (req, res) => {
    let userID = req.body;
    let sql = 'SELECT * FROM comments';
    // WHERE patientID = ' + JSON.stringify(userID.index)

    let query = db.query(sql, (err
        , results) => {
        if (err) throw err;
        res.send(results);

    });
});

server.post("/api/add-comment", (req, res) => {
    var body = req.body;
    var date = new Date();
    date.setHours(date.getHours() + 2);

    let sql = 'INSERT INTO comments (patientID, commentContent, commentTime) VALUES (' + JSON.stringify(body.index) + ', ' + JSON.stringify(body.comment) + ',' + JSON.stringify(date) + ')';
    let query = db.query(sql, (err
        , results) => {
        if (err) throw err;
        res.send(results);
    });
});