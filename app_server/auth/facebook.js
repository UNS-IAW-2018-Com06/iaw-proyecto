var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var Users = require('../models/users');


passport.use(new FacebookStrategy({
    clientID: '580439325646370',
    clientSecret: 'ad98705353412d3e21d8b646cb15bb0d',
    callbackURL: "http://localhost:3000/"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

module.exports = passport;
