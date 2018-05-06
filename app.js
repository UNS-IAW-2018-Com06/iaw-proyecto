var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./app_server/models/db');
const passport = require('passport');
const Users = require('./app_server/models/users');
var FacebookStrategy = require('passport-facebook').Strategy;


var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var apiRouter = require('./app_server/routes/api');
var authRouter = require('./app_server/routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({
  secret: 'nodejs-twig-secret',
  resave: true,
  saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/', authRouter);


// passport config
// requires the model with Passport-Local Mongoose plugged in
// use static authenticate method of model in LocalStrategy

passport.use(new FacebookStrategy({
  clientID: '580439325646370',
  clientSecret: 'ad98705353412d3e21d8b646cb15bb0d',
  callbackURL: "https://unimapoteca.herokuapp.com/",
  profileFields: ['id', 'emails', 'displayName']
},
  function (accessToken, refreshToken, profile, cb) {
    process.nextTick(function () {
      console.log(profile);
    });
  }
));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});


app.use(passport.initialize());
app.use(passport.session());


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
