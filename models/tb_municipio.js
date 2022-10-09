const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_municipio', {
    id_municipio: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_departamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tb_departamento',
        key: 'id_departamento'
      }
    },
    municipio: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tb_municipio',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_municipio" },
        ]
      },
      {
        name: "id_departamento",
        using: "BTREE",
        fields: [
          { name: "id_departamento" },
        ]
      },
    ]
  });
};
