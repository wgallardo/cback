const express            = require('express');
const afiliado           = require('../controllers/afiliados.controller');


const router = express.Router();
router.get('/afiliados',  afiliado.findAllAdfiliados );
router.get('/afiliados_all',  afiliado.findAllAfiliadosFilter );
router.post('/afiliado',  afiliado.SaveNewdfiliado );

router.get('/test',  afiliado.SaveNewdfiliado );

module.exports = router;