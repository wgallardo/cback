const { db } = require("../models/conexion.model");



exports.getPeople = async (req, res) => {
    let id = req.params.id;
    //------------------------------------------------------//
    //----           VERIFICAR SI ESTA AFILIADO         ----//
    //------------------------------------------------------//
    const codigoAfiliado = await db.tb_afiliados.findOne({
        where: {
            identidad: id
        }
    });

    if(codigoAfiliado){
        return res.status(200).json({
            ok: false,
            message: `Error persona ya Afiliada con numero de carnet: <br> <div class="fontcodi">${ codigoAfiliado.cod_carnet }</div>`
        });

    }



    //------------------------------------------------------//
    //----                 SELECT PERSONA               ----//
    //------------------------------------------------------//
    const persona = await db.tb_rnp.findOne({
        where: {
            NUMERO_IDENTIDAD: id
        }
    });

    if(!persona){
        return res.status(200).json({
            ok: false,
            message: `No se encontró este número de identidad. Por favor, intenta con un número distinto.`
        });
    }

    data = {
        identidad: persona.NUMERO_IDENTIDAD,
        primer_nombre: persona.PRIMER_NOMBRE,
        segundo_nombre: persona.SEGUNDO_NOMBRE,
        primer_apellido: persona.PRIMER_APELLIDO,
        segundo_apellido: persona.SEGUNDO_APELLIDO,
        genero: persona.CODIGO_SEXO,
        fecha_nacimiento: persona.FECHA_NACIMIENTO,
        ok: true,
    }



    res.send( data ); 
}