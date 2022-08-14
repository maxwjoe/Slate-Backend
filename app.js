const express = require("express");
const {LOG} = require('./helper/log');

const app = express();
const PORT = 3000;

app.listen(PORT, (error) => {
    if(!error)
    {
        LOG(`Slate Backend Server running on port ${PORT}`);
    } else {
        LOG("Slate Backend failed to start");
    }
})