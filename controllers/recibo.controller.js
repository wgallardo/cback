const { db } = require("../models/conexion.model");


///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////            INSERT RECIBO CAJA POS           /////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
exports.saveSalePOS = async(req, res) => { 
    const body = req.body;
    //------------------------------------INICIAR TRANSACTION-----------------------------------//
    const t = await db.sequelize.transaction();
    try {
    const codigo = await db.tb_recibo_enc.findOne({
        attributes: [
            [db.sequelize.literal('MAX(numero_recibo)+1'), 't'],
        ]
    });
    cod_recibo = JSON.parse(JSON.stringify(codigo));
    


    //------------------------------------------------------------------------------------------//
    //----                            ACTUALIZAMOS DATOS DE TURNOS                          ----//
    //------------------------------------------------------------------------------------------//
    const dataTurno = {
        primera_factura: (body.primera_factura == 0 )? cod_recibo.t: body.primera_factura,
        efectivo: db.Sequelize.literal(`efectivo + ${ body.total }`), //efectivo+body.id_turno,
        ultima_factura: cod_recibo.t
    }
     await db.tb_turnos.update(dataTurno, 
        { 
            where: { id_turno: body.id_turno } ,
            transaction: t
        });


    //------------------------------------------------------------------------------------------//
    //----                    CREAR PRIMER INSERT DE ENCABEZADO DEL RECIBO                  ----//
    //------------------------------------------------------------------------------------------//
    const dataENC = {
        numero_recibo: cod_recibo.t,
        cod_carnet: body.cod_carnet,
        id_turno: body.id_turno,
        total_recibo: body.total
    }
    const reciboenc = await db.tb_recibo_enc.create(dataENC, { transaction: t });
 
    console.log(reciboenc.dataValues.id_recibo);
    for(items of body.caja){
        console.log(items)
        let datadet = {
            id_recibo: reciboenc.dataValues.id_recibo,
            concepto: items.descipcion,
            valor: items.valor
        }
        await db.tb_recibo_det.create(datadet, { transaction: t });
    }


    

    res.status(200).json({
        ok: true,
        cod_recibo: cod_recibo.t,
        codigo: reciboenc.dataValues.id_recibo,
        mensaje: `Recibo Generado Exitosamente. ${ reciboenc.dataValues.id_recibo }`
    });

    await t.commit();
   
    }catch (error) {
      res.status(500).json({
                message: {
                error
        }
      });
      await t.rollback();
    }
}