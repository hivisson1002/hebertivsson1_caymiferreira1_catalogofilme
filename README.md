# 🎬 Catálogo de Filmes

Sistema simples de gestão de catálogo de filmes desenvolvido com Express.js, EJS e Sequelize.

## 📋 Funcionalidades

- ✅ Tela inicial com filmes recentes
- ✅ Listagem completa de filmes
- ✅ Formulário para adicionar filmes
- ✅ Edição de filmes
- ✅ Visualização detalhada
- ✅ Exclusão de filmes
- ✅ Interface responsiva
- ✅ Validação de dados
- ✅ Uso de EJS e Partials

## 🚀 Como usar

### Pré-requisitos
- Node.js
- MySQL

### Instalação

1. **Instale as dependências:**
\`\`\`bash
npm install
\`\`\`

2. **Configure o MySQL:**
- Crie um banco chamado `catalogo_filmes`
- Configure as credenciais no arquivo `.env`

3. **Execute a aplicação:**
\`\`\`bash
# Desenvolvimento
npm run dev

# Produção
npm start
\`\`\`

4. **Acesse:** http://localhost:3000

## 📁 Estrutura

\`\`\`
catalogo-filmes/
├── app.js              # Arquivo principal
├── config/
│   └── database.js     # Configuração do banco
├── models/
│   ├── index.js        # Modelos
│   └── Filme.js        # Modelo do filme
├── routes/
│   └── filmes.js       # Rotas
├── views/
│   ├── partials/       # Componentes EJS
│   ├── filmes/         # Views dos filmes
│   └── index.ejs       # Página inicial
├── public/
│   ├── css/           # Estilos
│   └── js/            # Scripts
└── scripts/           # Scripts SQL
\`\`\`

## 🎯 Funcionalidades

### Página Inicial
- Exibe filmes recentes
- Cards informativos
- Navegação simples

### Gestão de Filmes
- **Criar**: Adicionar novos filmes
- **Ler**: Visualizar detalhes
- **Atualizar**: Editar informações
- **Deletar**: Remover filmes

### Campos do Filme
- Título (obrigatório)
- Diretor (obrigatório)
- Ano (obrigatório)
- Gênero (obrigatório)
- Duração em minutos (obrigatório)
- Nota de 0 a 10 (opcional)
- Sinopse (opcional)

## 🛠️ Tecnologias

- **Backend**: Express.js
- **Template**: EJS com Partials
- **Banco**: MySQL + Sequelize
- **Frontend**: Bootstrap 5
- **Validação**: Sequelize + JavaScript

Sistema simples e funcional para gerenciar catálogo de filmes! 🎬
