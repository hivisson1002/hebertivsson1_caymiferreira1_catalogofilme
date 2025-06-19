const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Filme = sequelize.define(
  "Filme",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "O título é obrigatório",
        },
        len: {
          args: [1, 255],
          msg: "O título deve ter entre 1 e 255 caracteres",
        },
      },
    },
    diretor: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "O diretor é obrigatório",
        },
      },
    },
    ano: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "O ano deve ser um número inteiro",
        },
        min: {
          args: 1900,
          msg: "O ano deve ser maior que 1900",
        },
        max: {
          args: new Date().getFullYear() + 5,
          msg: "O ano não pode ser muito no futuro",
        },
      },
    },
    genero: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "O gênero é obrigatório",
        },
      },
    },
    duracao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "A duração deve ser um número inteiro",
        },
        min: {
          args: 1,
          msg: "A duração deve ser maior que 0",
        },
      },
    },
    nota: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: true,
      validate: {
        isDecimal: {
          msg: "A nota deve ser um número decimal",
        },
        min: {
          args: [0],
          msg: "A nota deve ser maior ou igual a 0",
        },
        max: {
          args: [10],
          msg: "A nota deve ser menor ou igual a 10",
        },
        // Validação customizada para permitir null
        isValidRating(value) {
          if (value !== null && value !== undefined && value !== "") {
            if (value < 0 || value > 10) {
              throw new Error("A nota deve estar entre 0 e 10")
            }
          }
        },
      },
    },
    sinopse: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "filmes",
    timestamps: true,
  },
)

module.exports = Filme
