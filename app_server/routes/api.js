var express = require('express');
var router = express.Router();
const universidadApi = require('../controllers/universidadApi');
const comentarioApi  = require('../controllers/comentarioApi');
const middleware     = require('../auth/middleware');

/* GET home page. */
router.get('/universidades',universidadApi.getUniversidades);
router.post('/comentario',middleware,comentarioApi.setComentario);

module.exports = router;
