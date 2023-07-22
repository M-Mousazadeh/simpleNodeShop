const express = require('express');

const connectDB = require('./app/config/db');

const app = express();

require('dotenv').config({
    path: './app/config/config.env'
});

connectDB()

const PORT = process.env.PORT;

app.use('/', require('./app/routes/index'));

app.listen(PORT, ()=>{
    console.log(`The Server Is Currently Running On Port ${PORT}`);
})