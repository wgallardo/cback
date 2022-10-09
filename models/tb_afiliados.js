const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_afiliados', {
    id_codigo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cod_carnet: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    primer_nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    segundo_nombre: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    primer_apellido: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    segundo_apellido: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    identidad: {
      type: DataTypes.STRING(13),
      allowNull: false
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    id_genero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tb_genero',
        key: 'id_genero'
      }
    },
    id_nacionalidad: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tb_nacionalidad',
        key: 'id_nacionalidad'
      }
    },
    lugar_de_nacimiento: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    identidad_extendida: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id_estado_civil: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_estado: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tb_estado',
        key: 'id_estado'
      }
    }
  }, {
    sequelize,
    tableName: 'tb_afiliados',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_codigo" },
        ]
      },
      {
        name: "id_genero",
        using: "BTREE",
        fields: [
          { name: "id_genero" },
        ]
      },
      {
        name: "id_nacionalidad",
        using: "BTREE",
        fields: [
          { name: "id_nacionalidad" },
        ]
      },
      {
        name: "id_estado",
        using: "BTREE",
        fields: [
          { name: "id_estado" },
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
