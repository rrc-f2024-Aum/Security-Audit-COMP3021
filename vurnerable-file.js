// vulnerable-example.js - Intentionally insecure for CodeQL detection
const mysql = require('mysql');
const connection = mysql.createConnection({host: 'localhost', user: 'root'});

// VULNERABLE: SQL Injection via string concatenation
function getUserById(userId) {
    const query = "SELECT * FROM users WHERE id = " + userId;
    connection.query(query, (error, results) => {
        return results;
    });
}

// VULNERABLE: Unsafe eval()
function calculate(input) {
    return eval(input);
}

// VULNERABLE: Command injection
const { exec } = require('child_process');
function runCommand(userInput) {
    exec('ls ' + userInput);
}

module.exports = { getUserById, calculate, runCommand };