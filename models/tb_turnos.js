const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_turnos', {
    id_turno: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha_inicio: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    fecha_final: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    saldo_inicial: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    efectivo: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    cheque: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    primera_factura: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ultima_factura: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tb_turnos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_turno" },
        ]
      },
    ]
  });
};
