const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalerrorhandler = require('./controllers/errorController');
const tourRouter = require('./routers/tourRouters');
const usersRouter = require('./routers/usersRouters');



const app = express();
//Middleware:middle of the request and the response
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

//routers
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',usersRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  

app.use(globalerrorhandler);

module.exports = app;