const { db } = require("../models/conexion.model");




///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////                SELECT CUOTAS                /////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
exports.filterCuotas = async(req, res) => { 
    const tipo = req.params.id;
    const Cuotas = await db.tb_cuotas.findOne({
        where:  {
            tipo 
        }
    });
    res.send(Cuotas);
}



///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////          SELECT ANIOS APORTACIONES          /////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
exports.filterAportaciones = async(req, res) => { 
    const cod_carnet = req.params.id;
    const mes = ['','Enero', 'Febrero', 'Marzo', 'Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    const Aportaciones = await db.tb_aportaciones.findAll({
        where: {
            cod_carnet
        },
         
        attributes: [
            [db.sequelize.fn('DISTINCT', db.sequelize.col('mes')), 'distinct'],
            'mes', 'estado_pago','valor_cuota', 'valor_pagado','anio',
            
        ],
        order: [ ['mes', 'ASC'] ],
    });


    
   
    const objMapped = await Aportaciones.reduce((acc, item) => {
        
        (acc[item.anio] = acc[item.anio] || []).push(
            {mes: item.mes, 
             anio: item.anio,  
             mesdescripcion: mes[item.mes], 
             valor_cuota: item.valor_cuota,  
             valor_pagado: item.valor_pagado, 
             select: 0,
             estado_pago: (Number(item.valor_cuota) > Number(item.valor_pagado) )? 'PENDIENTE' : 'PAGADO'  
            }
        );
        return acc;
      }, {});

    let result = Object.keys(objMapped).map((key) => [Number(key), objMapped[key]]);
 
    for (let e = 0; e < result.length; e++) {
        
         if(e == (result.length-1) ){
            let data_anterior = result[e][1][result[e][1].length-1];
            let length = (data_anterior.mes);

             for (let i = length; i < 12; i++) {
                 
                result[e][1].push(
                    {mes: (i+1), 
                     anio: result[e][0], 
                     mesdescripcion: mes[(i+1)], 
                     valor_cuota: data_anterior.valor_cuota,  
                     valor_pagado: '0.00', 
                     select: 0,
                     estado_pago: 'ND' 
                    } 
                );
        //         console.log('jajajajajaj');
             }
         } 
    }

      
    res.send(result);
}



///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////           GUARDAR POSTEO DE CUOTAS          /////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
exports.savePosteoCuotas = async(req, res) => { 
    const body = req.body;
    const d_t = new Date();

    const t = await db.sequelize.transaction();
    for(const items of body.data){
        let total = Number(items.valor_pagado) + items.valor_restante;
        if(items.estado == 'ND' ){
            let data = {
                cod_carnet: body.cod_carnet,
                tipo_pago: 1, //efectivo+body.id_turno,
                id_forma_pago: 4,
                estado_pago: 'PAGADO',
                anio: items.anio,
                mes: items.mes,
                fecha_vencimiento: d_t,
                fecha_pagado: d_t,
                id_usuario: 6,
                valor_cuota: items.valor_cuota,
                valor_pagado: total,
                documento: body.documento
            }

            await db.tb_aportaciones.create(data, { transaction: t });

        }else{
            
            let data = {
                estado_pago: 'PAGADO',
                valor_pagado: total, //efectivo+body.id_turno,
                documento: body.documento,
                fecha_pagado: d_t,
            }

           await db.tb_aportaciones.update(data, 
            { 
                where: { cod_carnet: body.cod_carnet, anio: items.anio, mes: items.mes } ,
                transaction: t
            });
        }
    }

    res.status(201).json({
        ok: true,
    });

    await t.commit();
    
    
    
}

 