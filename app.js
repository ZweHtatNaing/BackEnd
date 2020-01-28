var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var cors = require('cors');
var bodyParser = require('body-parser');
require('dotenv').config();

var authRoute = require('./routes/auth');
var usersRoute = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: [
    'http://localhost:3000',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

authRoute(app);
usersRoute(app);

// Configure bodyparser to handle post requests
app.use(bodyParser.json({limit: '100mb'}));
app.use(
    bodyParser.urlencoded({
      limit: '100mb',
      extended: true,
      parameterLimit: 600
    })
);

const connectToDb = require('./db_config/db-config');

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
