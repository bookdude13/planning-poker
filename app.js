const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const timeout = require('connect-timeout');
require('dotenv').config();
const config = require('./config');

// Session management
const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

// Routing
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const roomsRouter = require('./routes/rooms');

// Storage
let playerStorage = require('./app/playerStorage');

function haltOnTimeout(req, res, next) {
  if (!req.timedout) next();
}

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(timeout('15s'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(haltOnTimeout);

// Session
app.use(session({
  store: new MySQLStore(config.cookieStoreConfig),
  key: 'ppokses',
  secret: config.cookieSecret,
  resave: false,
  saveUninitialized: false
}));

// Routes
app.use([ '/', '/login', '/logout' ], (req, res, next) => {
  // Reset current room when leaving a room page (async)
  if (req.session.player_id) {
    playerStorage.updatePlayerRoom(req.session.player_id, null);
  }

  next();
});
app.use('/login', loginRouter);
app.use([ '/', '/rooms' ], (req, res, next) => {
  // Redirect if we don't have a valid session
  if (!req.session.player_id) {
    return res.redirect('/login');
  }

  next();
});
app.use('/logout', logoutRouter);
app.use('/', indexRouter);
app.use('/rooms', roomsRouter);
app.use(haltOnTimeout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
