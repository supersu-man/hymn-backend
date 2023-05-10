const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database.db')

db.run('CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, password TEXT NOT NULL);')

db.run('CREATE TABLE IF NOT EXISTS rooms (room_id INTEGER PRIMARY KEY, name TEXT NOT NULL, password TEXT, p1 TEXT NOT NULL, p2 TEXT, FOREIGN KEY (p1) REFERENCES users (username) ON DELETE CASCADE, FOREIGN KEY (p2) REFERENCES users (username));')

module.exports = db