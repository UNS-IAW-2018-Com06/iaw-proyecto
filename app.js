var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./app_server/models/db');
const passport = require('passport');
const User = require('./app_server/models/user');
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



	// Serializa al usuario para almacenarlo en la sesión
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	// Deserializa el objeto usuario almacenado en la sesión para
	// poder utilizarlo
	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});
// passport config
// requires the model with Passport-Local Mongoose plugged in
// use static authenticate method of model in LocalStrategy

passport.use(new FacebookStrategy({
  clientID: '580439325646370',
  clientSecret: 'ad98705353412d3e21d8b646cb15bb0d',
  callbackURL: "https://unimapoteca.herokuapp.com/",
  profileFields: ['id', 'emails', 'displayName']
}, function (accessToken, refreshToken, profile, done) {
  // El campo 'profileFields' nos permite que los campos que almacenamos
  // se llamen igual tanto para si el usuario se autentica por Twitter o
  // por Facebook, ya que cada proveedor entrega los datos en el JSON con
  // un nombre diferente.
  // Passport esto lo sabe y nos lo pone más sencillo con ese campo
  User.findOne({ provider_id: profile.id }, function (err, user) {
    if (err) throw (err);
    if (!err && user != null) return done(null, user);

    // Al igual que antes, si el usuario ya existe lo devuelve
    // y si no, lo crea y salva en la base de datos
    var user = new User({
      provider_id: profile.id,
      provider: profile.provider,
      name: profile.displayName,
      photo: profile.photos[0].value
    });
    user.save(function (err) {
      if (err) throw err;
      done(null, user);
    });
  });
}));


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
