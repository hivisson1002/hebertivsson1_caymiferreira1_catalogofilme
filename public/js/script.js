// Animações e efeitos melhorados
document.addEventListener("DOMContentLoaded", () => {
  // Animação de entrada para elementos
  const observador = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up")
      }
    })
  })

  document.querySelectorAll(".card, .content-section").forEach((el) => {
    observador.observe(el)
  })

  // Efeito parallax suave no hero
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const hero = document.querySelector(".hero-section")
    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`
    }
  })
})

// FUNÇÃO PARA EXCLUIR FILME - CORRIGIDA
function excluirFilme(id, titulo) {
  console.log(`🗑️ Tentando excluir filme ID: ${id}, Título: ${titulo}`)

  if (confirm(`⚠️ Tem certeza que deseja excluir o filme "${titulo}"?\n\nEsta ação não pode ser desfeita.`)) {
    // Mostrar loading
    const btnExcluir = event.target
    const originalText = btnExcluir.innerHTML
    btnExcluir.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Excluindo...'
    btnExcluir.disabled = true

    // Criar formulário para envio
    const form = document.createElement("form")
    form.method = "POST"
    form.action = `/filmes/${id}/excluir`
    form.style.display = "none"

    document.body.appendChild(form)

    console.log(`📤 Enviando requisição para: ${form.action}`)
    form.submit()
  }
}

// Função para mostrar toasts
function mostrarToast(mensagem, tipo = "info") {
  const toast = document.createElement("div")
  toast.className = `toast align-items-center text-white bg-${tipo === "error" ? "danger" : "success"} border-0`
  toast.setAttribute("role", "alert")
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        <i class="fas fa-${tipo === "error" ? "exclamation-triangle" : "check-circle"} me-2"></i>
        ${mensagem}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `

  let container = document.querySelector(".toast-container")
  if (!container) {
    container = document.createElement("div")
    container.className = "toast-container position-fixed top-0 end-0 p-3"
    document.body.appendChild(container)
  }

  container.appendChild(toast)
  const bsToast = new window.bootstrap.Toast(toast)
  bsToast.show()

  toast.addEventListener("hidden.bs.toast", () => {
    toast.remove()
  })
}

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Adicionar classe ativa na navegação
const currentPath = window.location.pathname
document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
  if (link.getAttribute("href") === currentPath) {
    link.classList.add("active")
  }
})
