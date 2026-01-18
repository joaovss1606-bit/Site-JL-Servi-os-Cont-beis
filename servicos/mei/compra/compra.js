import { supabase } from '/jl-servicos-contabeis/supabase.js'

// ================= SERVIÇOS =================
const servicos = {
  'abertura-mei': {
    titulo: 'Abertura de MEI',
    valor: 'R$ 148,99',
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
    valor: 'R$ 198,99',
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
    valor: 'R$ 128,99',
    inclusos: [
      'Análise antes da baixa',
      'Encerramento correto',
      'Verificação de pendências',
      'Orientações pós-baixa',
      'Suporte'
    ]
  },
  'emissao-das': {
    titulo: 'Emissão de DAS',
    valor: 'R$ 48,99',
    inclusos: [
      'Emissão da guia DAS',
      'Verificação de valores',
      'Orientações de pagamento',
      'Envio da guia',
      'Suporte'
    ]
  },
  'dasn': {
    titulo: 'Declaração Anual DASN-SIMEI',
    valor: 'R$ 98,99',
    inclusos: [
      'Conferência das informações',
      'Envio da declaração',
      'Regularização de pendências',
      'Comprovante de envio',
      'Orientações finais'
    ]
  },
  'parcelamento': {
    titulo: 'Parcelamento de Débitos',
    valor: 'R$ 178,99',
    inclusos: [
      'Análise dos débitos',
      'Simulação de parcelamento',
      'Solicitação junto à Receita',
      'Acompanhamento',
      'Orientações'
    ]
  },
  'alteracao-mei': {
    titulo: 'Alteração de Dados do MEI',
    valor: 'R$ 78,99',
    inclusos: [
      'Alteração de dados cadastrais',
      'Atualização no Portal do Empreendedor',
      'Conferência final',
      'Orientações',
      'Suporte'
    ]
  }
}

// ================= PLANOS =================
const planos = {
  basico: {
    titulo: 'Plano MEI Básico',
    valor: 'R$ 99,00 / mês',
    inclusos: [
      '✔ Emissão mensal do DAS',
      '✔ Lembretes de vencimento',
      '✔ DASN-SIMEI (1x ao ano)',
      '✔ Acompanhamento básico',
      '✔ Suporte via WhatsApp',
      '✔ 10% de desconto em serviços avulsos'
    ]
  },
  premium: {
    titulo: 'Plano MEI Premium',
    valor: 'R$ 159,00 / mês',
    destaque: true,
    inclusos: [
      '✔ Todos os benefícios do plano básico',
      '✔ Regularização fiscal completa',
      '✔ Parcelamento de débitos',
      '✔ Emissão de certidões',
      '✔ Orientação personalizada',
      '✔ Relatório mensal de situação',
      '✔ Suporte prioritário',
      '✔ 20% de desconto em serviços avulsos'
    ]
  }
}

// ================= PARAMS =================
const params = new URLSearchParams(window.location.search)
const servicoKey = params.get('servico')
const planoKey = params.get('plano')

// ================= CONTEXTO =================
let tituloFinal = ''
let listaItens = []
let tipoPedido = ''
let valorFinal = ''

if (planoKey && planos[planoKey]) {
  const plano = planos[planoKey]
  tituloFinal = plano.titulo
  listaItens = plano.inclusos
  tipoPedido = `Plano - ${plano.titulo}`
  valorFinal = plano.valor

  if (planoKey === 'premium') {
    const msg = document.getElementById('mensagem-premium')
    if (msg) msg.style.display = 'block'
  }

} else if (servicoKey && servicos[servicoKey]) {
  const servico = servicos[servicoKey]
  tituloFinal = servico.titulo
  listaItens = servico.inclusos
  tipoPedido = `Serviço - ${servico.titulo}`

} else {
  alert('Serviço ou plano inválido.')
  throw new Error('Parâmetros inválidos')
}

// ================= RENDER =================
document.getElementById('titulo-servico').textContent = tituloFinal
document.getElementById('breadcrumb-servico').textContent = tituloFinal

const lista = document.getElementById('lista-inclusos')
lista.innerHTML = ''
listaItens.forEach(item => {
  const li = document.createElement('li')
  li.textContent = item
  lista.appendChild(li)
})

const elValor = document.getElementById('valor-plano')
if (elValor && valorFinal) {
  elValor.textContent = valorFinal
}

// ================= FORM =================
const form = document.getElementById('form-pedido')
const btnEnviar = document.getElementById('btn-enviar')

const campoNome = form.nome
const campoEmail = form.email
const campoCPF = form.cpf
const campoWhats = form.whatsapp
const campoObs = form.obs

btnEnviar.disabled = true

function validarFormulario() {
  const valido =
    campoNome.value.trim() &&
    campoEmail.value.trim() &&
    campoCPF.value.trim() &&
    campoWhats.value.trim()

  btnEnviar.disabled = !valido
  btnEnviar.classList.toggle('ativo', valido)
}

;[campoNome, campoEmail, campoCPF, campoWhats].forEach(campo =>
  campo.addEventListener('input', validarFormulario)
)

form.addEventListener('submit', e => e.preventDefault())

// ================= ENVIO =================
btnEnviar.addEventListener('click', () => {
  if (btnEnviar.disabled) return

  btnEnviar.textContent = 'Enviando...'
  btnEnviar.disabled = true

  const pedido = {
    tipo: planoKey ? 'plano' : 'servico',
    item: tipoPedido,
    valor: valorFinal || null,
    nome: campoNome.value.trim(),
    email: campoEmail.value.trim(),
    cpf: campoCPF.value.trim(),
    whatsapp: campoWhats.value.trim(),
    obs: campoObs.value.trim()
  }

  const mensagem = `
Novo pedido:

📌 ${pedido.item}
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