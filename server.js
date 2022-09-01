const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const {errorHandler} = require("./middleware/errorMiddleware")
const connectDB = require('./config/db');
//
// --- Setup ---
connectDB();
const app = express();

// --- Middleware ---

//Cors Configuration - Start
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested, Content-Type, Accept Authorization"
    )
    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "POST, PUT, PATCH, GET, DELETE"
      )
      return res.status(200).json({})
    }
    next()
  })
  //Cors Configuration - End

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