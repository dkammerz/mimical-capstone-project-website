const db = require('./db');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    // This is the function that is called when the user tries to log in
    // It checks if the user exists in the database and if the password is correct
    // If the user exists and the password is correct, it returns the user object
    // If the user does not exist or the password is wrong, it returns false
    passport.use(
        new localStrategy((username, password, done) => {
            const query = 'SELECT * FROM therapist WHERE email = ' + JSON.stringify(username);
            db.query(query, [username], (err, results) => {
                if (err) {
                    console.log(err);
                    { throw err }
                }

                if (results.length === 0) {
                    return done(null, false);
                }


                bcrypt.compare(password, results[0].password, (err, response) => {
                    if (err) { throw err };
                    if (response) {
                        return done(null, results[0]);
                    } else {
                        return done(null, false);
                    }
                });
            })
        })
    );
    // The user object is then stored in the session
    // This function is called when the user is logged in
    passport.serializeUser((user, done) => {
        done(null, user.ID);
    });

    // This function is called when the user is logged out
    // It removes the user object from the session
    passport.deserializeUser((id, done) => {
        const query = 'SELECT * FROM therapist WHERE ID = ' + id;
        db.query(query, [id], (err, results) => {
            if (err) {
                console.log(err);
                throw err;
            }

            const userInfo = [
                title = results[0].title,
                name = results[0].name,
                prename = results[0].prename,
                ID = results[0].ID,
                email = results[0].email,
                password = results[0].password,
                company = results[0].company,
                isAdmin = results[0].isAdmin,
            ];
            done(null, userInfo);
        }
        );
    });
}