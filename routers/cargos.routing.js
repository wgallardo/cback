const express            = require('express');
const cargos             = require('../controllers/cargo.controller');


const router = express.Router();
router.get('/cargos',  cargos.findAllCargo );

module.exports = router;