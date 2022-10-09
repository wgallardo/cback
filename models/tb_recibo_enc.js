const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_recibo_enc', {
    id_recibo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    numero_recibo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_turno: {
      type: DataTypes.INTEGER
    },

    cod_carnet: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    total_recibo: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_recibo_enc',
    timestamps: true
  });
};
