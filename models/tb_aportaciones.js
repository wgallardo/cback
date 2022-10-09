const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_aportaciones', {
    id_cuotas: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cod_carnet: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    tipo_pago: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_forma_pago: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    estado_pago: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "PENDIENTE"
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fecha_vencimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fecha_pagado: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    valor_cuota: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    valor_pagado: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "0"
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'tb_aportaciones',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_cuotas" },
        ]
      },
    ]
  });
};
