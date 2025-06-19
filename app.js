const express = require("express")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")
const path = require("path")
const { sequelize, Filme } = require("./models")

const app = express()
const PORT = process.env.PORT || 3000

// Configuração do EJS
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname, "public")))

// Log de todas as requisições
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  console.log("Body:", req.body)
  next()
})

// Rotas
const filmesRoutes = require("./routes/filmes")
app.use("/", filmesRoutes)

// Iniciar servidor
async function iniciarServidor() {
  try {
    console.log("Tentando conectar ao banco...")
    await sequelize.authenticate()
    console.log("✅ Conexão com MySQL estabelecida com sucesso!")

    console.log("Sincronizando tabelas...")
    await sequelize.sync({ force: false })
    console.log("✅ Tabelas sincronizadas!")

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`)
      console.log(`Acesse: http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error("❌ Erro ao conectar com o banco:", error)
    process.exit(1)
  }
}

iniciarServidor()
