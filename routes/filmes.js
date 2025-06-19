const express = require("express")
const { Filme } = require("../models")
const router = express.Router()

// Página inicial
router.get("/", async (req, res) => {
  console.log("📍 Rota GET / chamada")
  try {
    const filmes = await Filme.findAll({
      order: [["created_at", "DESC"]],
      limit: 6,
    })
    console.log(`✅ Encontrados ${filmes.length} filmes`)
    res.render("index", { filmes })
  } catch (error) {
    console.error("❌ Erro ao buscar filmes:", error)
    res.render("index", { filmes: [] })
  }
})

// Listar todos os filmes
router.get("/filmes", async (req, res) => {
  console.log("📍 Rota GET /filmes chamada")
  try {
    const filmes = await Filme.findAll({
      order: [["titulo", "ASC"]],
    })
    console.log(`✅ Listando ${filmes.length} filmes`)
    res.render("filmes/lista", { filmes })
  } catch (error) {
    console.error("❌ Erro ao buscar filmes:", error)
    res.render("filmes/lista", { filmes: [], erro: "Erro ao carregar filmes" })
  }
})

// Formulário para novo filme
router.get("/filmes/novo", (req, res) => {
  console.log("📍 Rota GET /filmes/novo chamada")
  res.render("filmes/formulario", {
    filme: {},
    acao: "criar",
    titulo: "Adicionar Filme",
  })
})

// Criar novo filme
router.post("/filmes", async (req, res) => {
  console.log("🎬 Rota POST /filmes chamada")
  console.log("📝 Dados recebidos:", req.body)

  try {
    // Validação básica
    const { titulo, diretor, ano, genero, duracao } = req.body

    console.log("🔍 Validando dados...")
    if (!titulo || !diretor || !ano || !genero || !duracao) {
      console.log("❌ Campos obrigatórios faltando")
      throw new Error("Todos os campos obrigatórios devem ser preenchidos")
    }

    console.log("💾 Preparando dados para o banco...")

    let notaProcessada = null
    if (req.body.nota && req.body.nota.trim() !== "") {
      const notaValue = Number.parseFloat(req.body.nota)
      if (!Number.isNaN(notaValue) && notaValue >= 0 && notaValue <= 10) {
        notaProcessada = notaValue
      } else {
        throw new Error("A nota deve ser um número entre 0 e 10")
      }
    }

    const dadosFilme = {
      titulo: titulo.trim(),
      diretor: diretor.trim(),
      ano: Number.parseInt(ano),
      genero: genero.trim(),
      duracao: Number.parseInt(duracao),
      nota: notaProcessada,
      sinopse: req.body.sinopse && req.body.sinopse.trim() !== "" ? req.body.sinopse.trim() : null,
    }

    console.log("📊 Dados processados:", dadosFilme)

    const novoFilme = await Filme.create(dadosFilme)
    console.log("✅ Filme criado com ID:", novoFilme.id)

    console.log("🔄 Redirecionando para /filmes")
    return res.redirect("/filmes")
  } catch (error) {
    console.error("❌ Erro ao criar filme:", error)
    console.error("Stack:", error.stack)

    // Melhor tratamento de erro
    let mensagemErro = "Erro ao salvar filme. Tente novamente."

    if (error.name === "SequelizeValidationError") {
      mensagemErro = error.errors.map((e) => e.message).join(", ")
    } else if (error.message) {
      mensagemErro = error.message
    }

    return res.render("filmes/formulario", {
      filme: req.body,
      acao: "criar",
      titulo: "Adicionar Filme",
      erro: mensagemErro,
    })
  }
})

// Ver filme específico
router.get("/filmes/:id", async (req, res) => {
  console.log(`📍 Rota GET /filmes/${req.params.id} chamada`)
  try {
    const filme = await Filme.findByPk(req.params.id)
    if (!filme) {
      console.log("❌ Filme não encontrado")
      return res.status(404).render("erro", { mensagem: "Filme não encontrado" })
    }
    console.log("✅ Filme encontrado:", filme.titulo)
    res.render("filmes/detalhes", { filme })
  } catch (error) {
    console.error("❌ Erro ao buscar filme:", error)
    res.status(500).render("erro", { mensagem: "Erro ao carregar filme" })
  }
})

// Formulário para editar filme
router.get("/filmes/:id/editar", async (req, res) => {
  console.log(`📍 Rota GET /filmes/${req.params.id}/editar chamada`)
  try {
    const filme = await Filme.findByPk(req.params.id)
    if (!filme) {
      return res.status(404).render("erro", { mensagem: "Filme não encontrado" })
    }
    res.render("filmes/formulario", {
      filme,
      acao: "editar",
      titulo: "Editar Filme",
    })
  } catch (error) {
    console.error("❌ Erro ao buscar filme:", error)
    res.status(500).render("erro", { mensagem: "Erro ao carregar filme" })
  }
})

// Atualizar filme
router.put("/filmes/:id", async (req, res) => {
  console.log(`🎬 Rota PUT /filmes/${req.params.id} chamada`)
  try {
    const filme = await Filme.findByPk(req.params.id)
    if (!filme) {
      return res.status(404).render("erro", { mensagem: "Filme não encontrado" })
    }

    // Processar dados da mesma forma que na criação
    let notaProcessada = null
    if (req.body.nota && req.body.nota.trim() !== "") {
      const notaValue = Number.parseFloat(req.body.nota)
      if (!Number.isNaN(notaValue) && notaValue >= 0 && notaValue <= 10) {
        notaProcessada = notaValue
      }
    }

    const dadosAtualizacao = {
      titulo: req.body.titulo.trim(),
      diretor: req.body.diretor.trim(),
      ano: Number.parseInt(req.body.ano),
      genero: req.body.genero.trim(),
      duracao: Number.parseInt(req.body.duracao),
      nota: notaProcessada,
      sinopse: req.body.sinopse && req.body.sinopse.trim() !== "" ? req.body.sinopse.trim() : null,
    }

    await filme.update(dadosAtualizacao)
    console.log("✅ Filme atualizado")
    res.redirect("/filmes")
  } catch (error) {
    console.error("❌ Erro ao atualizar filme:", error)

    let mensagemErro = "Erro ao atualizar filme"
    if (error.name === "SequelizeValidationError") {
      mensagemErro = error.errors.map((e) => e.message).join(", ")
    }

    const filme = await Filme.findByPk(req.params.id)
    res.render("filmes/formulario", {
      filme: { ...filme.dataValues, ...req.body },
      acao: "editar",
      titulo: "Editar Filme",
      erro: mensagemErro,
    })
  }
})

// ROTA DE EXCLUSÃO CORRIGIDA
router.delete("/filmes/:id", async (req, res) => {
  console.log(`🗑️ Rota DELETE /filmes/${req.params.id} chamada`)
  console.log("Method:", req.method)
  console.log("Headers:", req.headers)

  try {
    const filme = await Filme.findByPk(req.params.id)
    if (!filme) {
      console.log("❌ Filme não encontrado para exclusão")
      return res.status(404).json({ erro: "Filme não encontrado" })
    }

    console.log(`🎬 Excluindo filme: ${filme.titulo}`)
    await filme.destroy()
    console.log("✅ Filme deletado com sucesso")

    if (req.xhr || req.headers.accept?.includes("application/json")) {
      return res.json({ sucesso: true, mensagem: "Filme excluído com sucesso" })
    } else {
      return res.redirect("/filmes")
    }
  } catch (error) {
    console.error("❌ Erro ao deletar filme:", error)

    if (req.xhr || req.headers.accept?.includes("application/json")) {
      return res.status(500).json({ erro: "Erro ao excluir filme" })
    } else {
      return res.redirect("/filmes?erro=Erro ao excluir filme")
    }
  }
})

// ROTA ADICIONAL PARA EXCLUSÃO VIA POST (fallback)
router.post("/filmes/:id/excluir", async (req, res) => {
  console.log(`🗑️ Rota POST /filmes/${req.params.id}/excluir chamada`)

  try {
    const filme = await Filme.findByPk(req.params.id)
    if (!filme) {
      console.log("❌ Filme não encontrado para exclusão")
      return res.status(404).render("erro", { mensagem: "Filme não encontrado" })
    }

    console.log(`🎬 Excluindo filme: ${filme.titulo}`)
    await filme.destroy()
    console.log("✅ Filme deletado com sucesso")

    return res.redirect("/filmes")
  } catch (error) {
    console.error("❌ Erro ao deletar filme:", error)
    return res.redirect("/filmes")
  }
})

module.exports = router
