const express = require('express');
const router = express.Router();
const db = require('../../database/db').getDB();
const bcrypt = require('bcrypt');
router.post('/register', async (req, res) => {
    const { name, email, password, isFarmer } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const table = isFarmer ? 'Farmers' : 'Businesses';
    db.run(`INSERT INTO ${table} (name, email, password) VALUES (?, ?, ?)`, [name, email, hashedPassword], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
});
router.post('/login', async (req, res) => {
    const { email, password, isFarmer } = req.body;
    const table = isFarmer ? 'Farmers' : 'Businesses';
    db.get(`SELECT * FROM ${table} WHERE email = ?`, [email], async (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const validPassword = await bcrypt.compare(password, row.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        res.json({ id: row.id });
    });
});
module.exports = router;