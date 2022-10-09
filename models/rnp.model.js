const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_rnp', {
      NUMERO_IDENTIDAD: {
        type: DataTypes.STRING(13),
        allowNull: false,
        primaryKey: true
      },
      PRIMER_NOMBRE: {
        type: DataTypes.STRING(25),
        allowNull: true
      },
      SEGUNDO_NOMBRE: {
        type: DataTypes.STRING(25),
        allowNull: true
      },
      PRIMER_APELLIDO: {
        type: DataTypes.STRING(25),
        allowNull: true
      },
      SEGUNDO_APELLIDO: {
        type: DataTypes.STRING(25),
        allowNull: true
      },
      CODIGO_SEXO: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      FECHA_NACIMIENTO: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
    
  }, {
    sequelize,
    tableName: 'tb_rnp',
    timestamps: false
  });
};
