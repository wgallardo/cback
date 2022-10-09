const DataTypes       =     require("sequelize").DataTypes;
const _rnp            =     require("./rnp.model");

initModels = ( sequelize ) => { 
    //------------------------------------------------------//
    //----           PASAR CONEXION A LAS TABLAS        ----//
    //------------------------------------------------------//
    const rnp           = _rnp(sequelize, DataTypes);



    return {
        rnp
    };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;