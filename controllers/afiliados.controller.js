const { db } = require("../models/conexion.model");
const { getPagination, getPagingData, getCodigoAfiliacion } = require('../utils/utils');
const { schemaAfiliado, parseToCloudAfiliado, parseToCloudBeneficiario, parseToCloudContacto, parseToCloudEmpleo, parseToCloudCuota, parseToCloudEstudio } = require('../utils/afiliado');
const Validator = require('fastest-validator');

const Op = db.Sequelize.Op;
const path = require('path');
const fs = require('fs');


///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////                 ALL AFILIADO                /////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
exports.findAllAdfiliados = async(req, res) => { 
	  let = page = Number(req.query.page) || 0;
    let = size = Number(req.query.size) || 10;
    const { limit, offset } = getPagination(page, size);
    /////////////////////----FILTRO POR NOMBRE (OPCIONAL)----//////////////////////
    let search = null;
    if(req.query.search){
      search = {
        [Op.or]: [
          db.Sequelize.where(db.Sequelize.fn('concat', db.Sequelize.col('primer_nombre'), ' ', db.Sequelize.col('segundo_nombre'), ' ', db.Sequelize.col('primer_apellido'), ' ', db.Sequelize.col('segundo_apellido')), {
                [Op.like]: `%${req.query.search}%`
          }),
          { identidad: req.query.search  },
          { cod_carnet: req.query.search  },
          //{ empresa: { [Op.like]: `%${req.query.search}%` } }
        ]
      }
    };


    const [count, data] = await Promise.all([
        /////////////////////----PROMESA PARA EL CONTEO DE CLIENTES----//////////////////////
        db.tb_afiliados.count({where: [{ id_codigo: {[Op.ne]: null} }, search ] }),
        db.tb_afiliados.findAll({
          order: [ ['id_codigo', 'DESC'] ],
          where: [{ id_codigo: {[Op.ne]: null} }, search ],limit, offset 
        })
    ]);

    const datas = data.map((d) => {
    	return {
    		nombre: `${ d.primer_nombre } ${ (d.segundo_nombre == null) ? '' : d.segundo_nombre } ${ d.primer_apellido } ${ (d.segundo_apellido==null) ? '' : d.segundo_apellido }`,
    		numero_carnet: '1',
    		fecha_nacimiento: d.fecha_nacimiento,
    		identidad: d.identidad,
    		id_genero: d.id_genero,
        numero_carnet: d.cod_carnet,
    		genero: (d.id_genero == 1) ? 'Masculino': 'Femenino'
    	}
    })


    let { totalItems, totalPages, currentPage } = getPagingData( count , page, limit);
    const response = {};
    response.totalItems = totalItems;
    response.totalPages = totalPages;
    response.currentPage = currentPage;
    response.rows = datas;

    res.send(response);
}




////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////            GUARDAR NUEVO AFILIADO           //////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
exports.SaveNewdfiliado = async(req, res) => { 
  const body = req.body;
  
  /**//*----------------------------------------------------------------------------------*//**/
  /**//*                        OBTENER EL ULTIMO ID DE LA BASE DE DATOS.                  //**/
  /**//*----------------------------------------------------------------------------------*//**/
  /**/    const codigoAfiliado = await db.tb_afiliados.findOne({                            /**/
  /**/         attributes: [                                                                /**/
  /**/             [db.sequelize.literal('MAX(SUBSTRING(cod_carnet,8,5))+1'), 't'],           /**/
  /**/             [db.sequelize.literal('DATE_FORMAT(NOW(), "%y")'), 'Anio'],              /**/
  /**/         ],                                                                           /**/
  /**/         where: {                                                                     /**/
  /**/           [Op.and]: db.sequelize.literal(`DATE_FORMAT(createdAt, "%Y") = 2022`)      /**/
  /**/        }                                                                             /**/
  /**/     })                                                                               /**/
  /**/    const codigo = getCodigoAfiliacion(codigoAfiliado);                               /**/
  /**//*----------------------------------------FIN --------------------------------------*//**/


  //-------------------------------------VALIDACION DE CAMPOS------------------------------------//
  const schema =  schemaAfiliado();
  const v = new Validator();
  const validationResponse = v.validate(body, schema);
  if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
  }

  //-------------------------------------INICIAR TRANSACTION------------------------------------//
  const t = await db.sequelize.transaction();
  try {
    //------------------------------------------------------------------------------------------//
    //----                CREAR PRIMER INSERT DE DATOS GENERALES DEL AFILIADO               ----//
    //------------------------------------------------------------------------------------------//
    const dataAfiliado = await parseToCloudAfiliado(body, codigo);   
    await db.tb_afiliados.create(dataAfiliado, { transaction: t });

    //------------------------------------------------------------------------------------------//
    //----                CREAR SEGUNDO INSERT DE BENEFICIARIOS DE UN AFILIADO              ----//
    //------------------------------------------------------------------------------------------//
    for(let data of body.beneficiario){
      let dataBeneficiario = await parseToCloudBeneficiario(data, codigo); 
      await db.tb_beneficiarios.create(dataBeneficiario, { transaction: t });
    }

    //------------------------------------------------------------------------------------------//
    //----                   CREAR TERCER INSERT DE CONTACTO DE UN AFILIADO                 ----//
    //------------------------------------------------------------------------------------------//
    const dataContacto = await parseToCloudContacto(body, codigo); 
    await db.tb_contacto.create(dataContacto, { transaction: t });

    //------------------------------------------------------------------------------------------//
    //----                   CREAR CUARTO INSERT DE EMPLEOS DE UN AFILIADO                  ----//
    //------------------------------------------------------------------------------------------//
    for(let data of body.trabajo){
      console.log(data);
      let dataEmpleo = await parseToCloudEmpleo(data, codigo); 
      await db.tb_informacion_laboral.create(dataEmpleo, { transaction: t });
    }

    //------------------------------------------------------------------------------------------//
    //----                       CREAR QUINTO INSERT DEESTUDIO OBTENIDO                     ----//
    //------------------------------------------------------------------------------------------//
    const dataEstudio = await parseToCloudEstudio(body, codigo); 
    await db.tb_estudios_obtenidos.create(dataEstudio, { transaction: t });

    //------------------------------------------------------------------------------------------//
    //----                GENERAMOS LA PRIMERA CUOTA DE APORTACION DEL AFILIADO             ----//
    //------------------------------------------------------------------------------------------//
    const dataCuota = await parseToCloudCuota(body, codigo); 
    await db.tb_aportaciones.create(dataCuota, { transaction: t });



    res.status(200).json({
      ok: true,
      codigo: codigo,
      mensaje: `Afiliado guardado exitosamente codigo: de afiliacion. ${ codigo }`
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




///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////              ALL Afiliado Filter            /////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
exports.findAllAfiliadosFilter = async(req, res) => { 
  if(req.query.search){
    search = {
      [db.Sequelize.Op.or]: [
        { identidad: req.query.search },

        db.Sequelize.where(db.Sequelize.fn('concat', db.Sequelize.col('primer_nombre'), ' ', db.Sequelize.col('segundo_nombre'), ' ', db.Sequelize.col('primer_apellido'), ' ', db.Sequelize.col('segundo_apellido')), {
            [Op.like]: `%${req.query.search}%`
        }),
        { cod_carnet: req.query.search }
      ]
    }
  }

  const Afiliado = await db.tb_afiliados.findAll({
      where:  [search],
      limit: 5
  });

  const data = Afiliado.map((d) => {
    return {
        cod_carnet: d.cod_carnet,
        nombre: `${ d.primer_nombre } ${ d.segundo_nombre } ${ d.primer_apellido } ${ d.segundo_apellido }`,
        identidad: d.identidad
    }
  });

  res.send(data);
}




















