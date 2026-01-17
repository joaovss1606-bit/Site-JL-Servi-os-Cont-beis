import { supabase } from '/jl-servicos-contabeis/supabase.js'

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

// CAPTURA SERVIÇO
const params = new URLSearchParams(window.location.search)
const servicoKey = params.get('servico')

const servico = servicos[servicoKey]

if (!servico) {
  document.body.innerHTML = '<p>Serviço não encontrado.</p>'
  throw new Error('Serviço inválido')
}

// RENDERIZA
document.getElementById('titulo-servico').textContent = servico.titulo
document.getElementById('servico').value = servicoKey

const lista = document.getElementById('lista-inclusos')
servico.inclusos.forEach(item => {
  const li = document.createElement('li')
  li.textContent = item
  lista.appendChild(li)
})

// WHATSAPP
document.getElementById('btn-whatsapp').href =
  `https://wa.me/5500000000000?text=Olá, quero contratar o serviço: ${servico.titulo}`

// FORM
document.getElementById('form-pedido').addEventListener('submit', async (e) => {
  e.preventDefault()

  const formData = new FormData(e.target)

  const pedido = {
    servico: formData.get('servico'),
    nome: formData.get('nome'),
    cpf: formData.get('cpf'),
    whatsapp: formData.get('whatsapp'),
    obs: formData.get('obs')
  }

  const { error } = await supabase.from('pedidos').insert(pedido)

  if (error) {
    alert('Erro ao enviar pedido')
  } else {
    alert('Pedido enviado com sucesso!')
  }
})
