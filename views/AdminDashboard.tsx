import React, { useState } from 'react';
import { 
  User, ServiceRequest, ServiceStatus, ServiceType, Invoice, InvoiceData, CompanyIdentity, SubscriptionPlan, FaqItem, InternalAlert, CommunicationTemplate
} from '../types.ts';
import { SERVICE_LABELS, STATUS_COLORS, COMMUNICATION_TEMPLATES } from '../constants.ts';

interface AdminDashboardProps {
  admin: User;
  services: ServiceRequest[];
  setServices: React.Dispatch<React.SetStateAction<ServiceRequest[]>>;
  clients: User[];
  setClients: React.Dispatch<React.SetStateAction<User[]>>;
  invoices: Invoice[];
  setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
  clientInvoiceData: Record<string, InvoiceData>;
  identity: CompanyIdentity;
  onUpdateIdentity: (identity: CompanyIdentity) => void;
  plans: SubscriptionPlan[];
  onUpdatePlans: (plans: SubscriptionPlan[]) => void;
  faqs: FaqItem[];
  onUpdateFaqs: (faqs: FaqItem[]) => void;
  alerts: InternalAlert[];
  setAlerts: React.Dispatch<React.SetStateAction<InternalAlert[]>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  admin, services, setServices, clients, setClients, invoices, setInvoices, clientInvoiceData, identity, onUpdateIdentity, plans, onUpdatePlans, faqs, onUpdateFaqs, alerts, setAlerts
}) => {
  const [activeView, setActiveView] = useState<'OVERVIEW' | 'SERVICES' | 'CLIENTS' | 'PLANS' | 'FAQ' | 'CONFIG'>('OVERVIEW');
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);

  const stats = {
    revenue: invoices.reduce((a, b) => a + b.value, 0),
    pending: services.filter(s => s.status !== ServiceStatus.CONCLUIDO).length,
    clients: clients.length,
    alerts: alerts.filter(a => !a.resolved).length
  };

  const handleTogglePlan = (clientId: string) => {
    setClients(prev => prev.map(c => c.id === clientId ? { ...c, isPlanActive: !c.isPlanActive } : c));
  };

  const handleCopyMessage = (template: CommunicationTemplate, service: ServiceRequest) => {
    let msg = template.content
      .replace('[NOME]', service.clientName)
      .replace('[SERVICO]', SERVICE_LABELS[service.type])
      .replace('[STATUS]', service.status)
      .replace('[PENDENCIA]', 'documentos pendentes')
      .replace('[PRAZO]', service.deadline || '48 horas');
    
    navigator.clipboard.writeText(msg);
    alert("Mensagem copiada! Envie manualmente pelo seu e-mail.");
  };

  const exportClients = () => {
    const csv = "Nome,Email,Plano,Status\n" + clients.map(c => `${c.name},${c.email},${c.activePlanId},${c.isPlanActive}`).join("\n");
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'clientes.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-400 flex flex-col hidden lg:flex border-r border-slate-800">
        <div className="p-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">Administração</p>
          <nav className="space-y-1">
            {[
              { id: 'OVERVIEW', icon: 'fa-chart-pie', label: 'Dashboard' },
              { id: 'SERVICES', icon: 'fa-folder-open', label: 'Serviços' },
              { id: 'CLIENTS', icon: 'fa-user-friends', label: 'Clientes' },
              { id: 'PLANS', icon: 'fa-tags', label: 'Planos' },
              { id: 'FAQ', icon: 'fa-question-circle', label: 'FAQ Central' },
              { id: 'CONFIG', icon: 'fa-cog', label: 'Configurações' },
            ].map(item => (
              <button 
                key={item.id} onClick={() => setActiveView(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeView === item.id ? 'text-white' : 'hover:bg-white/5 hover:text-white'}`}
                style={activeView === item.id ? { backgroundColor: identity.primaryColor } : {}}
              >
                <i className={`fas ${item.icon} opacity-50`}></i> {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-grow overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {activeView === 'OVERVIEW' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="flex justify-between items-end">
                <h2 className="text-3xl font-black text-slate-900">Visão Geral</h2>
                <button onClick={exportClients} className="text-xs font-bold text-slate-500 border border-slate-200 px-4 py-2 rounded-xl hover:bg-white transition-all">
                  <i className="fas fa-download mr-2"></i> Exportar Base
                </button>
              </div>

              <div className="grid sm:grid-cols-4 gap-6">
                {[
                  { label: 'Alertas Ativos', val: stats.alerts, icon: 'fa-bell', color: 'text-red-500' },
                  { label: 'Serviços Ativos', val: stats.pending, icon: 'fa-clock', color: 'text-indigo-500' },
                  { label: 'Clientes Totais', val: stats.clients, icon: 'fa-users', color: 'text-slate-900' },
                  { label: 'Receita Total', val: `R$ ${stats.revenue.toFixed(2)}`, icon: 'fa-wallet', color: 'text-green-600' },
                ].map((s, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                    <i className={`fas ${s.icon} ${s.color} text-lg mb-4`}></i>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                      <p className="text-2xl font-black text-slate-900">{s.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Internal Alerts List */}
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 mb-6">Lembretes de Ações (Manuais)</h3>
                <div className="space-y-4">
                  {services.filter(s => s.status !== ServiceStatus.CONCLUIDO).map(svc => (
                    <div key={svc.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex gap-4">
                         <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400">
                           <i className="fas fa-exclamation-triangle"></i>
                         </div>
                         <div>
                            <p className="text-sm font-bold text-slate-900">{svc.clientName} - {SERVICE_LABELS[svc.type]}</p>
                            <p className="text-xs text-slate-500">Status: {svc.status.replace('_', ' ')}</p>
                         </div>
                      </div>
                      <div className="flex gap-2">
                        {COMMUNICATION_TEMPLATES.map(t => (
                          <button 
                            key={t.id}
                            onClick={() => handleCopyMessage(t, svc)}
                            className="px-3 py-1.5 bg-white border border-slate-200 text-[10px] font-black text-slate-500 rounded-lg hover:border-indigo-500 hover:text-indigo-600 transition-all"
                            title={t.title}
                          >
                            <i className="fas fa-copy mr-1"></i> {t.id === 'temp-doc' ? 'Pedir Docs' : 'Aviso Fim'}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  {services.length === 0 && <p className="text-slate-400 italic text-sm">Nenhuma pendência ativa.</p>}
                </div>
              </div>
            </div>
          )}

          {activeView === 'CLIENTS' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-2xl font-black">Base de Clientes & Planos</h2>
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-xs font-black uppercase text-slate-400">Cliente</th>
                      <th className="px-6 py-4 text-xs font-black uppercase text-slate-400">E-mail</th>
                      <th className="px-6 py-4 text-xs font-black uppercase text-slate-400">Acesso ao Portal</th>
                      <th className="px-6 py-4 text-xs font-black uppercase text-slate-400">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {clients.map(client => (
                      <tr key={client.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-bold text-slate-900">{client.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">{client.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black ${client.isPlanActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {client.isPlanActive ? 'PLANO ATIVO' : 'BLOQUEADO'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => handleTogglePlan(client.id)}
                            className="text-xs font-bold text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-white"
                          >
                            {client.isPlanActive ? 'Bloquear' : 'Ativar Manual'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;