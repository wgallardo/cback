const { initModels } = require("./initRNP.model")
const Sequelize = require("sequelize");




//------------------------------------------------------//
//----                  CONEXION MYSQL              ----//
//------------------------------------------------------//
const db_broker = new Sequelize(process.env.DB_DATABASE_R, process.env.DB_USER_R, process.env.DB_PASS, {
    host: process.env.HOST_R,
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
  db.rnp           =    Models.rnp;

  module.exports = { db };