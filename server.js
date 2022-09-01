const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const {errorHandler} = require("./middleware/errorMiddleware")
const connectDB = require('./config/db');
var cors = require('cors');

// --- Setup ---
connectDB();
const app = express();
const corsOptions ={
    origin:'*', 
    methods: ["PUT", "POST", "GET", "DELETE", "OPTIONS"],
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

// --- Middleware ---
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use('/api/sources', require('./routes/sourceRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/articles', require('./routes/articleRoutes'));
app.use('/api/lists', require('./routes/listRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));


app.use(errorHandler);


// --- Run ---
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})