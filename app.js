const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routers/tourRouters');
const usersRouter = require('./routers/usersRouters');



const app = express();
//Middleware:middle of the request and the response
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

//routers
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',usersRouter);

module.exports = app;