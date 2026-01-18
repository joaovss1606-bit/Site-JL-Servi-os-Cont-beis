import { supabase } from '/jl-servicos-contabeis/supabase.js'

// ================= SERVIÇOS =================
const servicos = {
  'abertura-mei': {
    titulo: 'Abertura de MEI',
    inclusos: [
      'Análise do perfil do empreendedor',
      'Cadastro no Portal do Empreendedor',
      'Definição correta da atividade (CNAE)',
      'Emissão do CNPJ',
      'Orientações iniciais',
      'Suporte após a abertura'
    ]
  },
  'regularizacao-mei': {
    titulo: 'Regularização de MEI',
    inclusos: [
      'Diagnóstico da situação',
      'Identificação de pendências',
      'Regularização de DAS',
      'Orientações fiscais',
      'Suporte completo'
    ]
  },
  'encerramento-mei': {
    titulo: 'Encerramento de MEI',
    inclusos: [
      'Análise antes da baixa',
      'Encerramento correto',
      'Verificação de pendências',
      'Orientações pós-baixa',
      'Suporte'
    ]
  }
}

// ================= PLANOS =================
const planos = {
  basico: {
    nome: 'Plano Básico',
    valor: 'R$ 149,90',
    beneficios: [
      'Execução do serviço escolhido',
      'Entrega padrão',
      'Orientações essenciais'
    ]
  },
  premium: {
    nome: 'Plano Premium',
    valor: 'R$ 249,90',
    beneficios: [
      'Execução do serviço escolhido',
      'Atendimento prioritário',
      'Suporte estendido',
      'Acompanhamento pós-serviço'
    ]
  }
}

// ================= PARAMS =================
const params = new URLSearchParams(window.location.search)
const servicoKey = params.get('servico')
const planoKey = params.get('plano')

// ================= IDENTIFICA CONTEXTO =================
let tituloFinal = ''
let listaItens = []
let tipoPedido = ''
let valorPlano = ''

if (planoKey && planos[planoKey]) {
  // ===== PÁGINA DE PLANO =====
  const plano = planos[planoKey]
  tituloFinal = plano.nome
  listaItens = plano.beneficios
  tipoPedido = plano.nome
  valorPlano = plano.valor

  // frase exclusiva premium
  if (planoKey === 'premium') {
    const msg = document.getElementById('mensagem-premium')
    if (msg) msg.style.display = 'block'
  }
} else if (servicoKey && servicos[servicoKey]) {
  // ===== SERVIÇO AVULSO =====
  const servico = servicos[servicoKey]
  tituloFinal = servico.titulo
  listaItens = servico.inclusos
  tipoPedido = servico.titulo
} else {
  alert('Serviço ou plano inválido.')
  throw new Error('Parâmetros inválidos')
}

// ================= RENDER =================
document.getElementById('titulo-servico').textContent = tituloFinal

const lista = document.getElementById('lista-inclusos')
lista.innerHTML = ''
listaItens.forEach(item => {
  const li = document.createElement('li')
  li.textContent = item
  lista.appendChild(li)
})

if (valorPlano) {
  const elValor = document.getElementById('valor-plano')
  if (elValor) elValor.textContent = valorPlano
}

// ================= FORM =================
const form = document.getElementById('form-pedido')
const btnEnviar = document.getElementById('btn-enviar')

const campoNome = form.querySelector('[name="nome"]')
const campoEmail = form.querySelector('[name="email"]')
const campoCPF = form.querySelector('[name="cpf"]')
const campoWhats = form.querySelector('[name="whatsapp"]')
const campoObs = form.querySelector('[name="obs"]')

// botão começa travado
btnEnviar.disabled = true

function validarFormulario() {
  const valido =
    campoNome.value.trim() &&
    campoEmail.value.trim() &&
    campoCPF.value.trim() &&
    campoWhats.value.trim()

  btnEnviar.disabled = !valido
  btnEnviar.classList.toggle('ativo', !!valido)
}

;[campoNome, campoEmail, campoCPF, campoWhats].forEach(campo => {
  campo.addEventListener('input', validarFormulario)
})

form.addEventListener('submit', e => e.preventDefault())

// ================= ENVIO =================
btnEnviar.addEventListener('click', () => {
  if (btnEnviar.disabled) return

  btnEnviar.textContent = 'Enviando...'
  btnEnviar.disabled = true

  const pedido = {
    tipo: planoKey ? 'plano' : 'servico',
    item: tipoPedido,
    valor: valorPlano || null,
    nome: campoNome.value.trim(),
    email: campoEmail.value.trim(),
    cpf: campoCPF.value.trim(),
    whatsapp: campoWhats.value.trim(),
    obs: campoObs.value.trim()
  }

  const mensagem = `
Novo pedido:

📌 ${pedido.tipo === 'plano' ? 'Plano' : 'Serviço'}: ${pedido.item}
${pedido.valor ? `💰 Valor: ${pedido.valor}` : ''}

👤 Nome: ${pedido.nome}
📧 Email: ${pedido.email}
📄 CPF: ${pedido.cpf}
📱 WhatsApp: ${pedido.whatsapp}
📝 Observações: ${pedido.obs || 'Nenhuma'}
`.trim()

  window.open(
    `https://wa.me/5561920041427?text=${encodeURIComponent(mensagem)}`,
    '_blank'
  )

  supabase.from('pedidos').insert(pedido)
})

// ================= MÁSCARAS =================
campoCPF.addEventListener('input', () => {
  let v = campoCPF.value.replace(/\D/g, '').slice(0, 11)
  v = v.replace(/(\d{3})(\d)/, '$1.$2')
  v = v.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
  v = v.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
  campoCPF.value = v
})

campoWhats.addEventListener('input', () => {
  let v = campoWhats.value.replace(/\D/g, '').slice(0, 11)
  v = v.replace(/^(\d{2})(\d)/, '($1) $2')
  v = v.replace(/(\d{5})(\d)/, '$1-$2')
  campoWhats.value = v
})