import React, { useState } from 'react';
import { User, ServiceRequest, ServiceStatus, ServiceType, Invoice, InvoiceData, CompanyIdentity, SubscriptionPlan, Document, CommunicationLog } from '../types.ts';
import { SERVICE_LABELS, STATUS_COLORS, LGPD_TEXT } from '../constants.ts';

interface ClientDashboardProps {
  user: User;
  services: ServiceRequest[];
  setServices: React.Dispatch<React.SetStateAction<ServiceRequest[]>>;
  invoices: Invoice[];
  invoiceData: InvoiceData | undefined;
  setInvoiceData: (data: InvoiceData) => void;
  identity: CompanyIdentity;
  activePlan: SubscriptionPlan | undefined;
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ 
  user, services, setServices, invoices, invoiceData, setInvoiceData, identity, activePlan
}) => {
  const [activeTab, setActiveTab] = useState<'SERVICES' | 'DOCS' | 'HISTORY' | 'FISCAL'>('SERVICES');
  const [requestModal, setRequestModal] = useState<{show: boolean, step: 1 | 2}>({show: false, step: 1});
  const [newRequest, setNewRequest] = useState({ type: 'MEI' as ServiceType, description: '' });

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (requestModal.step === 1) {
      setRequestModal({show: true, step: 2});
      return;
    }
    const req: ServiceRequest = {
      id: 'svc-' + Math.random().toString(36).substr(2, 9),
      clientId: user.id, clientName: user.name, type: newRequest.type, description: newRequest.description,
      status: ServiceStatus.PENDENTE, value: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      documents: [], history: [{id: '1', date: new Date().toISOString(), message: 'Solicitação recebida pelo sistema.', sender: 'SISTEMA'}],
      termsAccepted: true
    };
    setServices(prev => [...prev, req]);
    setRequestModal({show: false, step: 1});
    setNewRequest({type: 'MEI', description: ''});
    alert("Solicitação enviada! Aguarde a análise do contador.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header & Plan Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Portal de Atendimento</h1>
          <p className="text-slate-500 font-medium">Bem-vindo(a), {user.name}.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="px-6 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm text-center">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Seu Plano</p>
             <p className="text-xs font-black" style={{ color: identity.primaryColor }}>{activePlan?.name || 'Aguardando Ativação'}</p>
           </div>
           <button 
             onClick={() => setRequestModal({show: true, step: 1})}
             className="text-white px-8 py-4 rounded-2xl font-black hover:opacity-90 shadow-xl transition-all"
             style={{ backgroundColor: identity.primaryColor }}
           >
             Novo Serviço
           </button>
        </div>
      </div>

      {/* Internal Alerts / Notifications */}
      {services.some(s => s.status === ServiceStatus.AGUARDANDO_DOCUMENTO) && (
        <div className="mb-10 bg-orange-50 border-2 border-orange-200 p-6 rounded-3xl flex items-center gap-6 animate-pulse">
           <div className="w-12 h-12 bg-orange-200 text-orange-700 rounded-2xl flex items-center justify-center text-xl">
             <i className="fas fa-exclamation-triangle"></i>
           </div>
           <div>
             <h4 className="font-black text-orange-900">Ação Necessária!</h4>
             <p className="text-sm text-orange-800">Temos um ou mais serviços aguardando o envio de documentos para prosseguir.</p>
           </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-8 overflow-x-auto">
        {[
          { id: 'SERVICES', label: 'Meus Processos' },
          { id: 'DOCS', label: 'Documentos' },
          { id: 'HISTORY', label: 'Comunicações' },
          { id: 'FISCAL', label: 'Dados Fiscais' },
        ].map(tab => (
          <button 
            key={tab.id} onClick={() => setActiveTab(tab.id as any)}
            className={`px-8 py-4 font-black text-sm border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id ? 'border-current' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            style={activeTab === tab.id ? { color: identity.primaryColor, borderColor: identity.primaryColor } : {}}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'SERVICES' && (
        <div className="grid gap-6">
          {services.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200 text-slate-400 italic">
              Nenhuma solicitação em andamento.
            </div>
          ) : (
            services.map(svc => (
              <div key={svc.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                 <div className="flex gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${STATUS_COLORS[svc.status]}`}>
                      <i className="fas fa-file-signature"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900">{SERVICE_LABELS[svc.type]}</h3>
                      <p className="text-slate-500 text-sm mb-2">{svc.description}</p>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${STATUS_COLORS[svc.status]}`}>
                        {svc.status.replace('_', ' ')}
                      </span>
                    </div>
                 </div>
                 <button className="text-xs font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">
                   Histórico do Atendimento <i className="fas fa-chevron-right ml-1"></i>
                 </button>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'HISTORY' && (
        <div className="max-w-3xl mx-auto space-y-6">
          {services.map(svc => (
            <div key={svc.id} className="space-y-4">
              <h3 className="font-black text-slate-400 text-xs uppercase tracking-tighter ml-4">{SERVICE_LABELS[svc.type]}</h3>
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                {svc.history.map(log => (
                  <div key={log.id} className="flex gap-4 items-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] text-white flex-shrink-0 ${log.sender === 'ADMIN' ? 'bg-indigo-500' : 'bg-slate-300'}`}>
                      <i className={log.sender === 'ADMIN' ? 'fas fa-user-tie' : 'fas fa-robot'}></i>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 mb-1">{new Date(log.date).toLocaleString()}</p>
                      <p className="text-sm text-slate-700 leading-relaxed">{log.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {services.length === 0 && <p className="text-center py-20 text-slate-400 italic">Sem comunicações registradas.</p>}
        </div>
      )}

      {activeTab === 'FISCAL' && (
        <div className="max-w-2xl mx-auto bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl text-center">
          <i className="fas fa-id-card text-4xl text-slate-200 mb-6"></i>
          <h2 className="text-xl font-black mb-4">Seus Dados Fiscais</h2>
          <p className="text-sm text-slate-500 mb-8 leading-relaxed">Estes dados são usados exclusivamente para faturamento dos serviços do escritório contábil.</p>
          <button 
            className="w-full py-4 rounded-xl font-black text-white" 
            style={{ backgroundColor: identity.primaryColor }}
            onClick={() => setActiveTab('FISCAL')} // Simulação de abrir form
          >
            {invoiceData ? 'Atualizar Dados Fiscais' : 'Preencher Dados para NF'}
          </button>
        </div>
      )}

      {/* Modal Novo Serviço */}
      {requestModal.show && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl p-10 shadow-2xl animate-in zoom-in-95 duration-200">
            {requestModal.step === 1 ? (
              <form onSubmit={handleRequest} className="space-y-6">
                <h3 className="text-2xl font-black mb-2">Novo Serviço</h3>
                <p className="text-sm text-slate-500 mb-6">Selecione o tipo de atendimento contábil desejado.</p>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Tipo de Atendimento</label>
                  <select 
                    value={newRequest.type} onChange={e => setNewRequest({...newRequest, type: e.target.value as ServiceType})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 font-bold"
                  >
                    {Object.entries(SERVICE_LABELS).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Explicação / Detalhes</label>
                  <textarea 
                    required value={newRequest.description} onChange={e => setNewRequest({...newRequest, description: e.target.value})}
                    placeholder="Descreva brevemente sua necessidade..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 resize-none h-32 text-sm"
                  ></textarea>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setRequestModal({show: false, step: 1})} className="flex-grow py-4 rounded-xl bg-slate-100 text-slate-600 font-bold">Cancelar</button>
                  <button type="submit" className="flex-grow py-4 rounded-xl text-white font-bold shadow-lg" style={{ backgroundColor: identity.primaryColor }}>Próximo Passo</button>
                </div>
              </form>
            ) : (
              <div className="space-y-8">
                <h3 className="text-2xl font-black">Aceite de Responsabilidade</h3>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-sm text-slate-600 max-h-60 overflow-y-auto whitespace-pre-line leading-relaxed">
                  {LGPD_TEXT}
                  
                  Declaro que:
                  - As informações fornecidas são verdadeiras.
                  - Tenho ciência dos prazos e obrigações do serviço de {SERVICE_LABELS[newRequest.type]}.
                  - Autorizo o processamento de dados para fins contábeis.
                </div>
                <div className="flex flex-col gap-4">
                   <button 
                     onClick={handleRequest}
                     className="w-full py-5 rounded-2xl text-white font-black text-lg shadow-xl"
                     style={{ backgroundColor: identity.primaryColor }}
                   >
                     Aceitar e Solicitar Serviço
                   </button>
                   <button onClick={() => setRequestModal({show: true, step: 1})} className="text-xs font-bold text-slate-400">Voltar e Ajustar Dados</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;