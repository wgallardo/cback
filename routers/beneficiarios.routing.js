const express            = require('express');
const beneficiarios           = require('../controllers/beneficiarios.controller');


const router = express.Router();
router.get('/beneficiarios/:id',  beneficiarios.filterBeneficiarios );
 

module.exports = router;