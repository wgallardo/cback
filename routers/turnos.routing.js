const express            = require('express');
const turnos             = require('../controllers/turnos.controller');


const router = express.Router();
router.get('/turnos',  turnos.findAllTurnos);
router.get('/turno',  turnos.findOneTurno);

module.exports = router;