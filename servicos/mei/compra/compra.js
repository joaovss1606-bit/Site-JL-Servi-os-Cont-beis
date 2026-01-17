import { supabase } from '/jl-servicos-contabeis/supabase.js'

/* SERVIÇOS */
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
      'Orientações pós-baixa'
    ]
  }
}

/* CAPTURA SERVIÇO */
const params = new URLSearchParams(window.location.search)
const servicoKey = params.get('servico')
const servico = servicos[servicoKey]

if (!servico) {
  document.body.innerHTML = '<p>Serviço não encontrado.</p>'
  throw new Error('Serviço inválido')
}

/* RENDER */
document.getElementById('titulo-servico').textContent = servico.titulo
document.getElementById('servico').value = servicoKey

const lista = document.getElementById('lista-inclusos')
servico.inclusos.forEach(item => {
  const li = document.createElement('li')
  li.textContent = '✔ ' + item
  lista.appendChild(li)
})

/* MÁSCARAS */
const cpf = document.getElementById('cpf')
cpf.addEventListener('input', () => {
  cpf.value = cpf.value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
})

const whatsapp = document.getElementById('whatsapp')
whatsapp.addEventListener('input', () => {
  whatsapp.value = whatsapp.value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
})

/* ATIVAR BOTÃO */
const form = document.getElementById('form-pedido')
const btn = document.getElementById('btn-enviar')

form.addEventListener('input', () => {
  if (form.checkValidity()) {
    btn.disabled = false
    btn.classList.add('ativo')
  } else {
    btn.disabled = true
    btn.classList.remove('ativo')
  }
})

/* SUBMIT */
form.addEventListener('submit', async (e) => {
  e.preventDefault()

  btn.textContent = 'Enviando...'
  btn.disabled = true

  const data = Object.fromEntries(new FormData(form))

  await supabase.from('pedidos').insert(data)

 const msg =
  `Olá! Gostaria de contratar o serviço: ${servico.titulo}\n\n` +
  `Nome: ${data.nome}\n` +
  `E-mail: ${data.email}\n` +
  `CPF: ${data.cpf}\n` +
  `WhatsApp: ${data.whatsapp}\n\n` +
  `Observações: ${data.obs || 'Nenhuma'}`

  window.location.href =
    `https://wa.me/61920041427?text=${encodeURIComponent(msg)}`
})
