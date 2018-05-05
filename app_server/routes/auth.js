var router = require('express').Router();
const passport = require('../auth/facebook');

router.get('/login/facebook', 
    passport.authenticate('facebook'));


router.get('/login/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;