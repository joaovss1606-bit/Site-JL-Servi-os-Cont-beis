import React, { useState } from 'react';
import { UserRole, CompanyIdentity } from '../types.ts';
import { LGPD_TEXT } from '../constants.ts';

interface RegisterProps {
  onRegister: (user: any) => void;
  onBack: () => void;
  onLogin: () => void;
  identity: CompanyIdentity;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onBack, onLogin, identity }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    consent: false
  });
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }
    
    onRegister({
      id: 'client-' + Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      role: UserRole.CLIENTE,
      createdAt: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="p-8">
          <button onClick={onBack} className="text-slate-400 hover:text-slate-900 mb-8 flex items-center gap-2 transition-colors">
            <i className="fas fa-chevron-left"></i> Voltar
          </button>
          
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{identity.name}</h2>
              <p className="text-slate-500">Crie sua conta no portal</p>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: step === 1 ? identity.primaryColor : '#e2e8f0' }}></div>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: step === 2 ? identity.primaryColor : '#e2e8f0' }}></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nome Completo</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">E-mail</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Senha</label>
                    <input 
                      type="password" 
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Confirmar</label>
                    <input 
                      type="password" 
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  style={{ backgroundColor: identity.primaryColor }}
                >
                  Continuar para LGPD <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 h-64 overflow-y-auto">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <i className="fas fa-shield-alt" style={{ color: identity.primaryColor }}></i>
                    Privacidade e LGPD
                  </h3>
                  <div className="text-sm text-slate-600 space-y-4 whitespace-pre-line">
                    {LGPD_TEXT}
                  </div>
                </div>

                <label className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer" style={{ backgroundColor: `${identity.primaryColor}10`, borderColor: `${identity.primaryColor}30` }}>
                  <input 
                    type="checkbox" 
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({...formData, consent: e.target.checked})}
                    className="mt-1 w-5 h-5 rounded"
                    style={{ color: identity.primaryColor }} 
                  />
                  <div className="text-sm">
                    <span className="font-bold text-slate-900">Aceito os termos e declaro veracidade.</span>
                    <p className="text-slate-600 mt-1">
                      Compreendo que meus dados serão utilizados para fins de gestão contábil no escritório {identity.name}.
                    </p>
                  </div>
                </label>

                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 bg-slate-100 text-slate-700 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all"
                  >
                    Voltar
                  </button>
                  <button 
                    type="submit"
                    disabled={!formData.consent}
                    className="w-2/3 text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg disabled:opacity-50"
                    style={{ backgroundColor: identity.primaryColor }}
                  >
                    Finalizar Cadastro
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500">Já possui uma conta? <button onClick={onLogin} className="font-bold hover:underline" style={{ color: identity.primaryColor }}>Entre agora</button></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;