const express = require('express');

const {errorHandler} = require('./app/middlewares/errors');
const {setHeaders} = require('./app/middlewares/headers');
const connectDB = require('./app/config/db');

const app = express();

require('dotenv').config({
    path: './app/config/config.env'
});

connectDB()

//* BodyParser
app.use(express.urlencoded({extended : false}));
app.use(express.json({}));
app.use(setHeaders)

const PORT = process.env.PORT;

app.use('/', require('./app/routes/index'));
app.use('/user', require('./app/routes/UserRoutes'));

//* Error Handler
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`The Server Is Currently Running On Port ${PORT}`);
})