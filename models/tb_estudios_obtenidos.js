const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_estudios_obtenidos', {
    id_estudios: {
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
    intitucion_de_estudio: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    titulo_optenido: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    fecha_entrega: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tb_estudios_obtenidos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_estudios" },
        ]
      },
    ]
  });
};
