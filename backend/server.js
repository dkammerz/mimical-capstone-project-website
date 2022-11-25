import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send(console.log("Hello World!"));
});