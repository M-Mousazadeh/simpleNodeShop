const express = require('express');

const {errorHandler} = require('./app/middlewares/errors');
const {setHeaders} = require('./app/middlewares/headers');
const connectDB = require('./app/config/db');

const app = express();

//* Environment Variables
require('dotenv').config({
    path: './app/config/config.env'
});

//* Connect To DataBase
connectDB()

//* Setting Up the BodyParser, Json Parser and Headers
app.use(express.urlencoded({extended : false}));
app.use(express.json({}));
app.use(setHeaders)

app.use('/', require('./app/routes/index'));
app.use('/user', require('./app/routes/userRoutes'));
app.use('/dash', require('./app/routes/dashboard'));

//* Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`The Server Is Currently Running On Port ${PORT}`);
})