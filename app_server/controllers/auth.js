var passport = require('passport');
var User = require('../models/users');


const getRegister = function (req, res) {
    res.render('register');
};

const register = function (req, res) {
    User.register({ username: req.body.username }, req.body.password, function (err, user) {
        if (err) {
            return res.render('register', { user: user });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
};

const getLogin = function (req, res) {
    res.render('login', { user: req.user });
};

const login =  passport.authenticate('facebook',{ scope: ['email']});

const loginCallback = passport.authenticate('facebook', { failureRedirect: '/login' });

const logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

module.exports = {
    getRegister, register, getLogin, login, logout, loginCallback
}; 