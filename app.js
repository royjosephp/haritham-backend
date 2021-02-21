require("dotenv").config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var reportsRouter = require('./routes/reports');

var app = express();

connectDB();

app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/reports', reportsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// Error Handler Middleware
app.use(errorHandler);

module.exports = app;
