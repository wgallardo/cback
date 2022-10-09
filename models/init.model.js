    const DataTypes               =     require("sequelize").DataTypes;
    const _departamento           =     require("./departamentos.model");
    const _municipio              =     require("./municipio.model");

    const _tb_afiliados           =     require("./tb_afiliados");
    const _tb_aportacion          =     require("./tb_aportacion");
    const _tb_aportaciones        =     require("./tb_aportaciones");
    const _tb_beneficiarios       =     require("./tb_beneficiarios");
    const _tb_cargo               =     require("./tb_cargo");
    const _tb_contacto            =     require("./tb_contacto");
    const _tb_cuotas              =     require("./tb_cuotas");
    const _tb_estado              =     require("./tb_estado");
    const _tb_estudios_obtenidos  =     require("./tb_estudios_obtenidos");
    const _tb_genero              =     require("./tb_genero");
    const _tb_informacion_laboral =     require("./tb_informacion_laboral");
    const _tb_nacionalidad        =     require("./tb_nacionalidad");
    const _tb_nivel_escolar       =     require("./tb_nivel_escolar");
    const _tb_sector              =     require("./tb_sector");
    const _tb_usuarios            =     require("./tb_usuarios");
    const _tb_rnp                 =     require("./rnp.model");
    const _tb_productos           =     require("./tb_productos");
    const _tb_recibo_det          =     require("./tb_recibo_det");
    const _tb_recibo_enc          =     require("./tb_recibo_enc");
    const _tb_turnos              =     require("./tb_turnos");
    const _v_aportaciones         =     require("./v_aportaciones");
     




initModels = ( sequelize ) => { 
    //------------------------------------------------------//
    //----           PASAR CONEXION A LAS TABLAS        ----//
    //------------------------------------------------------//

    const departamento           = _departamento(sequelize, DataTypes);
    const municipio              = _municipio(sequelize, DataTypes);
    
    const tb_afiliados           = _tb_afiliados(sequelize, DataTypes);
    const tb_aportacion          = _tb_aportacion(sequelize, DataTypes);
    const tb_aportaciones        = _tb_aportaciones(sequelize, DataTypes);
    const tb_beneficiarios       = _tb_beneficiarios(sequelize, DataTypes);
    const tb_cargo               = _tb_cargo(sequelize, DataTypes);
    const tb_contacto            = _tb_contacto(sequelize, DataTypes);
    const tb_cuotas              = _tb_cuotas(sequelize, DataTypes);
    const tb_estado              = _tb_estado(sequelize, DataTypes);
    const tb_estudios_obtenidos  = _tb_estudios_obtenidos(sequelize, DataTypes);
    const tb_genero              = _tb_genero(sequelize, DataTypes);
    const tb_informacion_laboral = _tb_informacion_laboral(sequelize, DataTypes);
    const tb_nacionalidad        = _tb_nacionalidad(sequelize, DataTypes);
    const tb_nivel_escolar       = _tb_nivel_escolar(sequelize, DataTypes);
    const tb_sector              = _tb_sector(sequelize, DataTypes);
    const tb_usuarios            = _tb_usuarios(sequelize, DataTypes);
    const tb_rnp                 = _tb_rnp(sequelize, DataTypes);
    const tb_productos           = _tb_productos(sequelize, DataTypes);
    const tb_recibo_det          = _tb_recibo_det(sequelize, DataTypes);
    const tb_recibo_enc          = _tb_recibo_enc(sequelize, DataTypes);
    const tb_turnos              = _tb_turnos(sequelize, DataTypes);
    const v_aportaciones         = _v_aportaciones(sequelize, DataTypes);



    //------------------------------------------------------//
    //----          CREAR RELACIONES ENTRE TABLAS       ----//
    //------------------------------------------------------//
    // tb_usuarios.belongsTo(tb_roles, { as: "id_rol_tb_role", foreignKey: "id_rol"});
    // tb_roles.hasMany(tb_usuarios, { as: "tb_usuarios", foreignKey: "id_rol"});



    return {
        departamento,
        municipio,
        tb_afiliados,
        tb_aportacion,
        tb_aportaciones,
        tb_beneficiarios,
        tb_cargo,
        tb_contacto,
        tb_cuotas,
        tb_estado,
        tb_estudios_obtenidos,
        tb_genero,
        tb_informacion_laboral,
        tb_nacionalidad,
        tb_nivel_escolar,
        tb_sector,
        tb_usuarios,
        tb_rnp,
        tb_productos,
        tb_recibo_det,
        tb_recibo_enc,
        tb_turnos,
        v_aportaciones
    };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;