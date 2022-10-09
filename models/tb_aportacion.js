const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_aportacion', {
    id_aportacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_codigo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_tipo_aportacion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_articulo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha_pago: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    observacion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    valor: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tb_aportacion',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_aportacion" },
        ]
      },
      {
        name: "id_codigo",
        using: "BTREE",
        fields: [
          { name: "id_codigo" },
        ]
      },
    ]
  });
};
