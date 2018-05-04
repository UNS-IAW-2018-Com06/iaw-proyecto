var express = require('express');
var router = express.Router();
const universidadApi = require('../controllers/universidadApi');

/* GET home page. */
router.get('/universidades', universidadApi.getUniversidades);

module.exports = router;
