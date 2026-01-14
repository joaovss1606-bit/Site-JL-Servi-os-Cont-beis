import React from 'react';
import { CompanyIdentity, SubscriptionPlan } from '../types.ts';

interface PricingPageProps {
  identity: CompanyIdentity;
  plans: SubscriptionPlan[];
  onContract: (planId: string) => void;
  isAuthenticated: boolean;
  onGoToRegister: () => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ identity, plans, onContract, isAuthenticated, onGoToRegister }) => {
  const activePlans = plans.filter(p => p.isActive);

  const handleAction = (plan: SubscriptionPlan) => {
    if (!isAuthenticated) {
      onGoToRegister();
      return;
    }

    if (plan.checkoutUrl) {
      // Abre o link de pagamento em nova aba
      window.open(plan.checkoutUrl, '_blank');
      // Registra no sistema que o usuário está iniciando a contratação
      onContract(plan.id);
    } else {
      onContract(plan.id);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest uppercase mb-4" style={{ color: identity.primaryColor }}>
            Nossos Planos de Acompanhamento
          </h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Escolha o plano ideal para você
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            O acesso ao portal do cliente {identity.name} requer a contratação de um plano de acompanhamento contábil. Selecione uma opção para continuar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center justify-center">
          {activePlans.length === 0 ? (
            <div className="col-span-full text-center py-16 px-8 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 shadow-sm max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-exclamation-circle text-3xl text-slate-300"></i>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Nenhum plano disponível no momento</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Desculpe, não encontramos planos de assinatura ativos para contratação imediata via portal. 
                Para obter acesso ou contratar nossos serviços, entre em contato diretamente com nossa equipe.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href={`mailto:${identity.email}`}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all w-full sm:w-auto justify-center"
                >
                  <i className="fas fa-envelope"></i> {identity.email}
                </a>
                <a 
                  href={`https://wa.me/${identity.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all w-full sm:w-auto justify-center"
                >
                  <i className="fab fa-whatsapp"></i> WhatsApp
                </a>
              </div>
            </div>
          ) : (
            activePlans.map(plan => (
              <div 
                key={plan.id}
                className={`relative bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 ${plan.recommended ? 'border-current' : 'border-transparent'}`}
                style={plan.recommended ? { borderColor: identity.primaryColor } : {}}
              >
                {plan.recommended && (
                  <div 
                    className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 px-6 py-1.5 rounded-full text-white text-xs font-black uppercase tracking-widest"
                    style={{ backgroundColor: identity.primaryColor }}
                  >
                    Recomendado
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{plan.description}</p>
                </div>

                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-lg font-bold text-slate-400">R$</span>
                  <span className="text-5xl font-black text-slate-900">{plan.price.toFixed(2).split('.')[0]}</span>
                  <span className="text-xl font-bold text-slate-900">,{plan.price.toFixed(2).split('.')[1]}</span>
                  <span className="text-slate-400 text-sm font-medium ml-2">/ {plan.interval}</span>
                </div>

                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <i className="fas fa-check-circle mt-1 flex-shrink-0" style={{ color: identity.primaryColor }}></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleAction(plan)}
                  className="w-full py-5 rounded-2xl font-black text-lg transition-all shadow-lg hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-3"
                  style={{ 
                    backgroundColor: plan.recommended ? identity.primaryColor : '#f1f5f9',
                    color: plan.recommended ? 'white' : '#475569'
                  }}
                >
                  {isAuthenticated ? (
                    <>
                      {plan.checkoutUrl ? 'Contratar via Pagamento Seguro' : 'Assinar Plano'}
                      {plan.checkoutUrl && <i className="fas fa-external-link-alt text-xs opacity-50"></i>}
                    </>
                  ) : (
                    'Criar Conta para Iniciar'
                  )}
                </button>
              </div>
            ))
          )}
        </div>

        <div className="mt-16 flex flex-col items-center gap-6">
          <p className="text-slate-500 text-sm font-semibold flex items-center gap-2">
            <i className="fas fa-shield-alt" style={{ color: identity.primaryColor }}></i>
            Seus dados fiscais estão protegidos seguindo a LGPD.
          </p>
          <div className="flex gap-4">
             {identity.socialLinks.instagram && (
               <a href={identity.socialLinks.instagram} target="_blank" className="text-slate-400 hover:text-pink-600 transition-colors">
                 <i className="fab fa-instagram text-2xl"></i>
               </a>
             )}
             {identity.socialLinks.facebook && (
               <a href={identity.socialLinks.facebook} target="_blank" className="text-slate-400 hover:text-blue-600 transition-colors">
                 <i className="fab fa-facebook text-2xl"></i>
               </a>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;