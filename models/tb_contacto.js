const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_contacto', {
    id_contacto: {
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
    telefono_fijo: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    telefono_personal: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    telefono_oficina: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_contacto',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_contacto" },
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
