require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const db = require('./database/db');
app.use(express.json());
db.connectDB();
const productsRouter = require('./api/products');
const authRouter = require('./api/auth/auth');
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});