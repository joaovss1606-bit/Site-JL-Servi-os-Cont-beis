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
  },
  'emissao-das': {
    titulo: 'Emissão de DAS',
    inclusos: [
      'Emissão da guia DAS',
      'Orientações de vencimento',
      'Envio da guia',
      'Suporte'
    ]
  },
  'dasn': {
    titulo: 'Declaração Anual DASN-SIMEI',
    inclusos: [
      'Conferência de dados',
      'Envio da declaração',
      'Comprovante',
      'Orientações'
    ]
  },
  'parcelamento': {
    titulo: 'Parcelamento de Débitos',
    inclusos: [
      'Análise dos débitos',
      'Simulação de parcelamento',
      'Solicitação junto à Receita',
      'Orientações'
    ]
  },
  'alteracao-mei': {
    titulo: 'Alteração de Dados do MEI',
    inclusos: [
      'Alteração cadastral',
      'Atualização no portal',
      'Conferência final',
      'Orientações'
    ]
  }
}

// ================= CAPTURA DO SERVIÇO =================
const params = new URLSearchParams(window.location.search)
const servicoKey = params.get('servico')

// 🔒 trava o serviço em memória
if (!servicoKey || !servicos[servicoKey]) {
  alert('Serviço inválido ou não informado.')
  throw new Error('Serviço inválido')
}

const servico = servicos[servicoKey]

// ================= RENDERIZAÇÃO =================
document.getElementById('titulo-servico').textContent = servico.titulo
document.getElementById('servico').value = servicoKey

const lista = document.getElementById('lista-inclusos')
lista.innerHTML = ''
servico.inclusos.forEach(item => {
  const li = document.createElement('li')
  li.textContent = item
  lista.appendChild(li)
})

// ================= FORMULÁRIO =================
const form = document.getElementById('form-pedido')
const btnEnviar = document.getElementById('btn-enviar')

const camposObrigatorios = ['nome', 'email', 'cpf', 'whatsapp']

function validarFormulario() {
  const valido = camposObrigatorios.every(id => {
    const campo = document.getElementById(id)
    return campo && campo.value.trim() !== ''
  })

  if (valido) {
    btnEnviar.classList.add('ativo')
    btnEnviar.disabled = false
  } else {
    btnEnviar.classList.remove('ativo')
    btnEnviar.disabled = true
  }
}

camposObrigatorios.forEach(id => {
  document.getElementById(id).addEventListener('input', validarFormulario)
})

// ================= ENVIO =================
form.addEventListener('submit', async (e) => {
  e.preventDefault() // 🔥 ISSO É O MAIS IMPORTANTE

  btnEnviar.textContent = 'Enviando...'
  btnEnviar.disabled = true

  const formData = new FormData(form)

  const pedido = {
    servico: servicoKey,
    nome: formData.get('nome'),
    email: formData.get('email'),
    cpf: formData.get('cpf'),
    whatsapp: formData.get('whatsapp'),
    obs: formData.get('obs')
  }

  // SALVA NO SUPABASE
  const { error } = await supabase.from('pedidos').insert(pedido)

  if (error) {
    alert('Erro ao enviar pedido.')
    btnEnviar.textContent = 'Enviar pedido'
    btnEnviar.disabled = false
    return
  }

  // WHATSAPP
  const mensagem = `
Olá! Novo pedido de serviço:

📌 Serviço: ${servico.titulo}
👤 Nome: ${pedido.nome}
📧 Email: ${pedido.email}
📄 CPF: ${pedido.cpf}
📱 WhatsApp: ${pedido.whatsapp}
📝 Observações: ${pedido.obs || 'Nenhuma'}
  `.trim()

  const url = `https://wa.me/61920041427?text=${encodeURIComponent(mensagem)}`
  window.open(url, '_blank')

  btnEnviar.textContent = 'Pedido enviado'
})
