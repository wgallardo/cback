const { initModels } = require("./init.model")
const Sequelize = require("sequelize");




//------------------------------------------------------//
//----                  CONEXION MYSQL              ----//
//------------------------------------------------------//
const db_broker = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    operatorsAliases: 0,
    dateString: true,
    timezone: '-06:00',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
  });
  
  
  const  db = {};
  db.Sequelize = Sequelize;
  db.sequelize = db_broker;

  const Models = initModels(db.sequelize);
  //------------------------------------------------------//
  //----               REASIGNAR VARIABLES            ----//
  //------------------------------------------------------//
  db.usuarios          =    Models.tb_usuarios;
  db.departamento      =    Models.departamento;
  db.municipio         =    Models.municipio;
  
 
  db.tb_afiliados             =        Models.tb_afiliados;
  db.tb_aportacion            =        Models.tb_aportacion;
  db.tb_aportaciones          =        Models.tb_aportaciones;
  db.tb_beneficiarios         =        Models.tb_beneficiarios;
  db.tb_cargo                 =        Models.tb_cargo;
  db.tb_contacto              =        Models.tb_contacto;
  db.tb_cuotas                =        Models.tb_cuotas;
  db.tb_estado                =        Models.tb_estado;
  db.tb_estudios_obtenidos    =        Models.tb_estudios_obtenidos;
  db.tb_genero                =        Models.tb_genero;
  db.tb_informacion_laboral   =        Models.tb_informacion_laboral;
  db.tb_nacionalidad          =        Models.tb_nacionalidad;
  db.tb_nivel_escolar         =        Models.tb_nivel_escolar;
  db.tb_sector                =        Models.tb_sector;
  db.tb_rnp                   =        Models.tb_rnp;
  db.tb_productos             =        Models.tb_productos;
  db.tb_recibo_enc            =        Models.tb_recibo_enc;
  db.tb_recibo_det            =        Models.tb_recibo_det;
  db.tb_turnos                =        Models.tb_turnos;
  db.v_aportaciones           =        Models.v_aportaciones;


  

  module.exports = { db };