const express            = require('express');
const sale               = require('../controllers/recibo.controller');


const router = express.Router();
router.post('/sale',  sale.saveSalePOS);
 

module.exports = router;