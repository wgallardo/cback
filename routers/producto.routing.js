const express            = require('express');
const productos          = require('../controllers/productos.controller');


const router = express.Router();

router.get('/productos',  productos.findAllProducto ); 

module.exports = router;