const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/login/facebook',
  passport.authenticate('facebook', { scope: ['public_profile'] }));

router.get('/login/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });


module.exports = router;