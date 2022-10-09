const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_cuotas', {
    id_cuotas: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: true
    },
    valor_cuota: {
      type: DataTypes.DECIMAL(11,2),
      allowNull: true
    },
    tipo: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_cuotas',
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
