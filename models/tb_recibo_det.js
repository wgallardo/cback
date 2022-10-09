const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_recibo_det', {
    id_detalle_recibo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_recibo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tb_recibo_enc',
        key: 'id_recibo'
      }
    },
    concepto: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    valor: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tb_recibo_det',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_detalle_recibo" },
        ]
      },
      {
        name: "id_recibo",
        using: "BTREE",
        fields: [
          { name: "id_recibo" },
        ]
      },
    ]
  });
};
