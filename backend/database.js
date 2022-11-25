import mysql from 'mysql';

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function addPatient(name, id, gender, date, age, email, interests, diagnose, side, limits, notes, numbness) {
    await connection.query('INSERT INTO patients (Name, ID, Gender, Birthdate, Age, Email, Interests, Diagnose, Side, Limited, Numbness) VALUES (name, id, gender, date, age, email, interests, diagnose, side, limits, numbness)');
}

export async function getPatients() {
    const [rows] = await connection.query('SELECT * FROM patients');
    return rows;
}


