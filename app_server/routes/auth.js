const router = require('express').Router();
const auth = require('../controllers/auth');

router.get('/register', auth.getRegister);
router.post('/register', auth.register);

router.get('/login', auth.login);
router.get('/login/callback',auth.loginCallback,function (req, res) {
    console.log("QCYO");
    res.redirect('/');
});

router.get('/logout', auth.logout);

module.exports = router;