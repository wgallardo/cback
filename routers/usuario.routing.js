const express            = require('express');
const usuario         = require('../controllers/auth.controller');


const router = express.Router();

router.post('/auth/login',usuario.userLogin );

module.exports = router;