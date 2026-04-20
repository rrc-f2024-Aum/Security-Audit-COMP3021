// vulnerable-example.js
const express = require('express');
const app = express();
const mysql = require('mysql');
const { exec } = require('child_process');

const connection = mysql.createConnection({ host: 'localhost', user: 'root' });

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    const query = "SELECT * FROM users WHERE id = " + userId;
    connection.query(query, (err, results) => {
        res.json(results);
    });
});

app.get('/ping', (req, res) => {
    const host = req.query.host;
    exec('ping ' + host, (err, stdout) => {
        res.send(stdout);
    });
});

app.get('/search', (req, res) => {
    const term = req.query.q;
    res.send(`<h1>Search results for: ${term}</h1>`);
});

app.get('/calculate', (req, res) => {
    const formula = req.query.formula;
    const result = eval(formula);
    res.send(`Result: ${result}`);
});

app.listen(3000);