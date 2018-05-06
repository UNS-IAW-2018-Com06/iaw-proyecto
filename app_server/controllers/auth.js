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

const login = function (req, res) {
    passport.authenticate('facebook');
};

const loginCallback = function (req, res) {
    passport.authenticate('facebook', { failureRedirect: '/login' }),
        function (req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        }
}

const logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

module.exports = {
    getRegister, register, getLogin, login, logout
}; 