const sequelize = require("../config/database")
const Filme = require("./Filme")

// Testar conexão
sequelize
  .authenticate()
  .then(() => console.log("✅ Conexão com banco testada com sucesso"))
  .catch((err) => console.error("❌ Erro na conexão:", err))

const models = {
  Filme,
  sequelize,
}

module.exports = models
