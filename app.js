require('dotenv').config();
const express = require ('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const client = require('./db/client');
client.connect();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
    next();
});

const apiRouter = require('./api');
app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, 'build')));

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;