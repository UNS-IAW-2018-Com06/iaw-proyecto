var router = require('express').Router();
const passport = require('../auth/facebook');

router.get('/register', auth.getRegister);
router.post('/register', auth.register);

router.get('/login', auth.getLogin);
router.post('/login', auth.login);
router.get('/login/callback',auth.loginCallback);

router.get('/logout', auth.logout);

module.exports = router;