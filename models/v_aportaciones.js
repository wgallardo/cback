const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('v_aportaciones', {
    cod_carnet: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'v_aportaciones',
    timestamps: false,
  });
};
