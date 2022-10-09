const express            = require('express');
const rnp                = require('../controllers/rnp.controller');
const pdf                = require('../controllers/pdf.controller');


const router = express.Router();

router.get('/rnp/:id',  rnp.getPeople );
router.get('/pdf',      pdf.findPdf );

module.exports = router;