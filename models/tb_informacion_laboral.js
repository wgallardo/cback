const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_informacion_laboral', {
    id_informacion: {
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
    id_sector: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tb_sector',
        key: 'id_sector'
      }
    },
    id_nivel_escolar: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tb_nivel_escolar',
        key: 'id_nivel_escolar'
      }
    },
    instituto_trabajo: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    id_municipio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tb_municipio',
        key: 'id_municipio'
      }
    },
    id_cargo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tb_cargo',
        key: 'id_cargo'
      }
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fecha_final: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_informacion_laboral',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_informacion" },
        ]
      },
      {
        name: "id_municipio",
        using: "BTREE",
        fields: [
          { name: "id_municipio" },
        ]
      },
      {
        name: "id_sector",
        using: "BTREE",
        fields: [
          { name: "id_sector" },
        ]
      },
      {
        name: "id_nivel_escolar",
        using: "BTREE",
        fields: [
          { name: "id_nivel_escolar" },
        ]
      },
      {
        name: "id_cargo",
        using: "BTREE",
        fields: [
          { name: "id_cargo" },
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
