const { Sequelize } = require("sequelize")

console.log("🔧 Configurando conexão com banco...")
console.log("Host:", process.env.DB_HOST || "localhost")
console.log("Database:", process.env.DB_NAME || "catalogo_filmes")
console.log("User:", process.env.DB_USER || "root")

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Hi100203+",
  database: process.env.DB_NAME || "catalogo_filmes",
  logging: console.log, // Ativar logs SQL
  define: {
    timestamps: true,
    underscored: true,
  },
})

module.exports = sequelize
