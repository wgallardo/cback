const express            = require('express');
const mapa               = require('../controllers/mapa.controller');


const router = express.Router();

router.get('/departamento',  mapa.findAllDepartamento );
router.get('/departamento/:id',  mapa.findAllMunicipio );

module.exports = router;