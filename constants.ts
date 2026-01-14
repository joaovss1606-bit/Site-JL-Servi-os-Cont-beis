import { ServiceType, ServiceStatus, CompanyIdentity, SubscriptionPlan, FaqItem, CommunicationTemplate, User, UserRole } from './types.ts';

// Add MOCK_ADMIN_USER for login simulation and admin dashboard
export const MOCK_ADMIN_USER: User = {
  id: 'admin-01',
  name: 'Administrador Contábil',
  email: 'admin@escritorio.com.br',
  role: UserRole.ADMIN,
  createdAt: new Date().toISOString(),
  isPlanActive: true
};

export const DEFAULT_COMPANY_IDENTITY: CompanyIdentity = {
  name: 'ContabSeguro',
  slogan: 'Gestão contábil descomplicada para MEIs e Pessoas Físicas.',
  primaryColor: '#0f172a',
  email: 'contato@contabseguro.com.br',
  phone: '(11) 4002-8922',
  whatsapp: '5511999999999',
  heroImageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200',
  address: 'Av. Paulista, 1000 - São Paulo, SP',
  socialLinks: {
    instagram: 'https://instagram.com/contabseguro',
    linkedin: 'https://linkedin.com/company/contabseguro',
    facebook: 'https://facebook.com/contabseguro'
  }
};

export const INITIAL_PLANS: SubscriptionPlan[] = [
  {
    id: 'plan-basic',
    name: 'Acompanhamento Essencial',
    description: 'Ideal para quem precisa organizar documentos e ter um canal direto com o contador.',
    price: 49.90,
    interval: 'mensal',
    features: [
      'Acesso ao Portal do Cliente',
      'Coleta organizada de dados',
      'Histórico de atendimentos',
      'Visualização de notas fiscais do escritório'
    ],
    isActive: true,
    checkoutUrl: 'https://checkout.exemplo.com/plano-basico'
  },
  {
    id: 'plan-pro',
    name: 'Gestão MEI Pro',
    description: 'Plano completo para microempreendedores com acompanhamento mensal de faturamento.',
    price: 89.90,
    interval: 'mensal',
    features: [
      'Tudo do plano Essencial',
      'Controle de faturamento mensal',
      'Emissão assistida de DAS',
      'Alerta de prazos e obrigações'
    ],
    isActive: true,
    recommended: true,
    checkoutUrl: 'https://checkout.exemplo.com/plano-pro'
  }
];

export const INITIAL_FAQ: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Segurança & LGPD',
    question: 'Meus dados estão seguros?',
    answer: 'Sim. Utilizamos criptografia de ponta e seguimos rigorosamente a LGPD. Seus dados são usados exclusivamente para fins contábeis e fiscais.',
    isActive: true
  },
  {
    id: 'faq-2',
    category: 'Serviços',
    question: 'Como acompanho meu processo de IRPF?',
    answer: 'Após contratar o serviço e aceitar os termos, você poderá fazer o upload dos documentos e visualizar o status em tempo real no seu dashboard.',
    isActive: true
  },
  {
    id: 'faq-3',
    category: 'Planos',
    question: 'Como ativo meu plano após o pagamento?',
    answer: 'A ativação é feita manualmente pelo nosso administrador após a confirmação do pagamento. Geralmente ocorre em até 24h úteis.',
    isActive: true
  }
];

export const COMMUNICATION_TEMPLATES: CommunicationTemplate[] = [
  {
    id: 'temp-doc',
    title: 'Solicitação de Documentos',
    content: 'Olá [NOME],\n\nIdentificamos que faltam documentos para o serviço de [SERVICO]. Por favor, acesse seu portal e realize o upload de: [PENDENCIA].\n\nPrazo sugerido: [PRAZO].\n\nFico à disposição.'
  },
  {
    id: 'temp-done',
    title: 'Serviço Concluído',
    content: 'Olá [NOME],\n\nInformamos que o serviço de [SERVICO] foi concluído com sucesso. Sua nota fiscal já está disponível no portal.\n\nAtenciosamente,\nEquipe Contábil.'
  }
];

export const SERVICE_LABELS: Record<ServiceType, string> = {
  MEI: 'Gestão MEI (Abertura/DAS)',
  IRPF: 'Imposto de Renda (IRPF)',
  CPF: 'Regularização de CPF',
  PF_COMUM: 'Pessoa Física Comum',
  FINANCEIRO_PERSO: 'Planilhas Financeiras',
  OUTROS: 'Outros Serviços'
};

export const STATUS_COLORS: Record<ServiceStatus, string> = {
  PENDENTE: 'bg-yellow-100 text-yellow-800',
  EM_ANALISE: 'bg-blue-100 text-blue-800',
  PROCESSANDO: 'bg-indigo-100 text-indigo-800',
  AGUARDANDO_DOCUMENTO: 'bg-orange-100 text-orange-800',
  CONCLUIDO: 'bg-green-100 text-green-800',
  CANCELADO: 'bg-red-100 text-red-800'
};

export const LGPD_TEXT = `
TERMOS DE USO E POLÍTICA DE PRIVACIDADE (LGPD)

O Escritório de Contabilidade coleta dados estritamente necessários para a prestação de serviços e emissão de notas fiscais.

PROTEÇÃO DE DADOS:
Seus dados estão protegidos por criptografia e serão usados exclusivamente para as finalidades contábeis contratadas.

Ao utilizar este portal, você consente com o tratamento de dados conforme a Lei 13.709/2018 (LGPD).
`;