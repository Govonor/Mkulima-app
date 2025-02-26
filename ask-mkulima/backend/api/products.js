const express = require('express');
const router = express.Router();
const db = require('../database/db').getDB();
router.get('/', (req, res) => {
    db.all('SELECT * FROM Products', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ products: rows });
    });
});
module.exports = router;