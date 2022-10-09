const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_beneficiarios', {
    id_beneficiario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cod_carnet: {
      type: DataTypes.STRING(15),
      allowNull: false,
      references: {
        model: 'tb_afiliados',
        key: 'cod_carnet'
      }
    },
    nombre_beneficiario: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    parentesco: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    beneficio: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    is_tutor: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    nombre_tutor: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lugar_nacimiento: {
      type: DataTypes.STRING(150),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_beneficiarios',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_beneficiario" },
        ]
      },
      {
        name: "cod_carnet",
        using: "BTREE",
        fields: [
          { name: "cod_carnet" },
        ]
      },
    ]
  });
};
