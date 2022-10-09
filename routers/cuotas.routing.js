const express            = require('express');
const cuotas             = require('../controllers/cuotas.controller');


const router = express.Router();
router.get('/cuota/:id',     cuotas.filterCuotas );
router.get('/aportaciones/:id',  cuotas.filterAportaciones );
router.post('/aportaciones',  cuotas.savePosteoCuotas );

module.exports = router;