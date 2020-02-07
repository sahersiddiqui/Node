var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');

import routes from "./src/routes"

var app = express();

app.use(cors());
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//connecting to database
mongoose.connect('mongodb://localhost:27017/new', { useNewUrlParser: true, useUnifiedTopology: true }).then((data: any) => {

}).catch((e: any) => {
  throw e
});
mongoose.set('debug', true);

//including routes
app.use(routes);

// catch 404 and forward to error handler
app.use(function (req: any, res: any, next: any) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: any, res: any, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send({ "error": err.toString() });
});


app.listen(3000)

module.exports = app;
