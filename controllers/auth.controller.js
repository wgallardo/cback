const Validator = require('fastest-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require("../models/conexion.model");


///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////                  LOGIN USUARIO              /////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
exports.userLogin = async (req, res) => {
    let body = req.body;
    //↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓--VALIDACION DE CAMPOS REQUERIDOS INICIO--↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓//
    const schema = {
        password: {type:"string", optional: false, max: "100"},
        username: {type: "string", optional: false, max: "100"},
    }

    const v = new Validator();
    const validationResponse = v.validate(body, schema);
    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }
    ///↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑--VALIDACION DE CAMPOS REQUERIDOS FIN--↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑//

    //------------------------------------------------------//
    //----                 SELECT USUARIO               ----//
    //------------------------------------------------------//

    const usuario = await db.usuarios.findOne({
        where: { username: body.username}
    });

    if(!usuario){
        return res.status(401).json({
            ok: false,
            err: {
                message: 'Usuario o contraseña incorrectos'
            }
        });
    }

    //------------------------------VERIFICACIÓN DE LA CONTRASEÑA------------------------------//
    if(!bcrypt.compareSync(body.password, usuario.password) ){
        return res.status(401).json({
            ok: false,
            err: {
                message: 'Usuario o (contraseña) incorrectos'
            }
        });
    };

    data = {
        id_usuario: usuario.id_usuario,
        nombre_completo: usuario.nombre_completo,
        correo: usuario.correo
    }

    let token = jwt.sign(data, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
    res.send({ token });
}