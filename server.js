const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const {errorHandler} = require("./middleware/errorMiddleware")
const connectDB = require('./config/db');

// --- Setup ---
connectDB();
const app = express();

// --- Middleware ---
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use('/api/sources', require('./routes/sourceRoutes'));
app.use('/api/users', require('./routes/userRoutes'));


app.use(errorHandler);


// --- Run ---
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})