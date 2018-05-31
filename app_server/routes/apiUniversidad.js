var express = require('express');
var router = express.Router();
const universidadApi = require('../controllers/universidadApi');
const comentarioApi  = require('../controllers/comentarioApi');
const middleware     = require('../auth/middleware');

router.get('/universidad/all',universidadApi.getUniversidades);
router.get('/universidad/:uniID',universidadApi.getUniversidad);
router.post('/universidad/:uniID/comentar',middleware,comentarioApi.setComentario);
router.get('/universidad/provincia/:provID',universidadApi.getUniversidadProvincia);

module.exports = router;
