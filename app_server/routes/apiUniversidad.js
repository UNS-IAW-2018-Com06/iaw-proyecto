var express = require('express');
var router = express.Router();
const universidadApi = require('../controllers/universidadApi');
const comentarioApi  = require('../controllers/comentarioApi');
const middleware     = require('../auth/middleware');

router.get('/universidad/',universidadApi.getUniversidades);
router.get('/universidad/:uniID',universidadApi.getUniversidad);
router.get('/universidad/carreras/:carrera',universidadApi.getCarreras);
router.post('/universidad/:uniID/comentar',middleware,comentarioApi.setComentario);

module.exports = router;
