import React from 'react';
import { LGPD_TEXT, SERVICE_LABELS } from '../constants.ts';
import { CompanyIdentity, ServiceType } from '../types.ts';

interface LandingPageProps {
  onStart: () => void;
  onLogin: () => void;
  identity: CompanyIdentity;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onLogin, identity }) => {
  // Lista de serviços filtrada e descrita
  const services = [
    { type: 'MEI', icon: 'fa-store', desc: 'Abertura, acompanhamento mensal de faturamento e guias DAS.' },
    { type: 'IRPF', icon: 'fa-file-invoice-dollar', desc: 'Declaração anual, ganho de capital e regularização.' },
    { type: 'CPF', icon: 'fa-id-card', desc: 'Tratamento de situações cadastrais e pendências na Receita.' },
    { type: 'PF_COMUM', icon: 'fa-user-tie', desc: 'Consultoria contábil completa para autônomos e liberais.' },
    { type: 'FINANCEIRO_PERSO', icon: 'fa-chart-pie', desc: 'Controle de gastos e fluxo de caixa personalizado.' },
    { type: 'OUTROS', icon: 'fa-plus-circle', desc: 'Consulte nossa equipe para outros serviços específicos.' }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div 
          className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-10 -z-10"
          style={{ backgroundColor: identity.primaryColor }}
        ></div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div 
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wide"
              style={{ backgroundColor: `${identity.primaryColor}15`, color: identity.primaryColor }}
            >
              <i className="fas fa-shield-alt mr-2"></i> SEGURANÇA JURÍDICA E LGPD
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              {identity.name}: <span style={{ color: identity.primaryColor }}>Organização</span> e Segurança.
            </h1>
            <p className="text-lg text-slate-600 max-w-lg">
              {identity.slogan}. Plataforma dedicada para MEIs e Pessoas Físicas que buscam transparência e agilidade.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onStart}
                className="text-white px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 shadow-xl transition-all flex items-center gap-2"
                style={{ backgroundColor: identity.primaryColor, boxShadow: `0 20px 25px -5px ${identity.primaryColor}30` }}
              >
                Ver Planos e Começar <i className="fas fa-arrow-right text-sm"></i>
              </button>
              <button 
                onClick={onLogin}
                className="bg-slate-100 text-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-200 transition-all"
              >
                Área do Cliente
              </button>
            </div>
          </div>
          <div className="relative group">
            <div 
              className="absolute -inset-4 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"
              style={{ backgroundColor: identity.primaryColor }}
            ></div>
            <img 
              src={identity.heroImageUrl || "https://picsum.photos/seed/accounting/800/600"} 
              alt={identity.name} 
              className="relative rounded-2xl shadow-2xl w-full h-[450px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Serviços que atendemos</h2>
            <p className="text-slate-600">Especialização em atendimento individualizado com foco em conformidade fiscal e transparência.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-6"
                  style={{ backgroundColor: `${identity.primaryColor}10`, color: identity.primaryColor }}
                >
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{SERVICE_LABELS[item.type as ServiceType]}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LGPD Highlight Banner */}
      <section className="py-12 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="w-24 h-24 bg-indigo-500/20 rounded-3xl flex items-center justify-center text-5xl text-indigo-400 flex-shrink-0">
                <i className="fas fa-user-lock"></i>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-black">Sua privacidade é nossa prioridade</h2>
                <p className="text-slate-400 max-w-2xl leading-relaxed">
                  Não apenas seguimos a lei, nós cuidamos do seu patrimônio digital. Todos os dados que você insere no portal são protegidos por criptografia e utilizados estritamente para as finalidades contábeis contratadas. Transparência total em cada etapa.
                </p>
                <div className="flex gap-4 items-center">
                  <span className="flex items-center gap-2 text-xs font-bold bg-white/5 px-3 py-1.5 rounded-full text-slate-300 border border-white/10">
                    <i className="fas fa-check text-indigo-400"></i> Conformidade LGPD
                  </span>
                  <span className="flex items-center gap-2 text-xs font-bold bg-white/5 px-3 py-1.5 rounded-full text-slate-300 border border-white/10">
                    <i className="fas fa-lock text-indigo-400"></i> Criptografia Ponta-a-Ponta
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Social Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 text-center">
            <i className="fas fa-envelope text-3xl mb-4" style={{ color: identity.primaryColor }}></i>
            <h4 className="font-bold text-slate-900 mb-2">E-mail</h4>
            <p className="text-slate-600">{identity.email}</p>
          </div>
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 text-center">
            <i className="fab fa-whatsapp text-3xl mb-4 text-green-500"></i>
            <h4 className="font-bold text-slate-900 mb-2">WhatsApp</h4>
            <p className="text-slate-600">{identity.whatsapp}</p>
          </div>
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 text-center flex flex-col items-center">
            <div className="flex gap-4 mb-4">
               {identity.socialLinks.instagram && (
                 <a href={identity.socialLinks.instagram} target="_blank" className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center text-xl hover:scale-110 transition-transform">
                   <i className="fab fa-instagram"></i>
                 </a>
               )}
               {identity.socialLinks.facebook && (
                 <a href={identity.socialLinks.facebook} target="_blank" className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl hover:scale-110 transition-transform">
                   <i className="fab fa-facebook-f"></i>
                 </a>
               )}
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Redes Sociais</h4>
            <p className="text-slate-600 text-sm">Siga-nos para atualizações fiscais</p>
          </div>
        </div>
      </section>

      {/* LGPD Legal Text */}
      <section className="py-20 px-4 border-t border-slate-100 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
             <div className="flex items-center gap-3 mb-6">
              <i className="fas fa-balance-scale text-3xl" style={{ color: identity.primaryColor }}></i>
              <h2 className="text-2xl font-bold text-slate-900">Base Legal</h2>
            </div>
            <p className="text-slate-500 leading-relaxed whitespace-pre-line text-sm md:text-base">
              {LGPD_TEXT}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;