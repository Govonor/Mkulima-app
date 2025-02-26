const sqlite3 = require('sqlite3').verbose();
const path = require('path');
let db;
const connectDB = () => {
    const dbPath = path.resolve(__dirname, 'database.db');
    db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
        } else {
            console.log('Connected to the SQLite database.');
            createTables();
        }
    });
};
const createTables = () => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Farmers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            phone TEXT,
            farm_name TEXT,
            location TEXT
        );
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS Businesses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            phone TEXT,
            business_name TEXT,
            location TEXT
        );
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS Products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            farmer_id INTEGER,
            name TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL,
            quantity INTEGER NOT NULL,
            image TEXT,
            FOREIGN KEY (farmer_id) REFERENCES Farmers(id)
        );
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS Orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            business_id INTEGER,
            product_id INTEGER,
            quantity INTEGER NOT NULL,
            total_price REAL NOT NULL,
            order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            status TEXT DEFAULT 'pending',
            FOREIGN KEY (business_id) REFERENCES Businesses(id),
            FOREIGN KEY (product_id) REFERENCES Products(id)
        );
    `);
};
const getDB = () => {
    if (!db) {
        connectDB();
    }
    return db;
};
module.exports = { connectDB, getDB };