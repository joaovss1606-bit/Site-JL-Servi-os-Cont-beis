
import React, { useState } from 'react';
import { UserRole, CompanyIdentity } from '../types.ts';
import { MOCK_ADMIN_USER } from '../constants.ts';

interface LoginProps {
  onLogin: (user: any) => void;
  onBack: () => void;
  onRegister: () => void;
  onResetPassword: () => void;
  identity: CompanyIdentity;
}

const Login: React.FC<LoginProps> = ({ onLogin, onBack, onRegister, onResetPassword, identity }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (email === 'admin@escritorio.com.br') {
        onLogin(MOCK_ADMIN_USER);
      } else {
        onLogin({
          id: 'client-' + Math.random().toString(36).substr(2, 9),
          name: email.split('@')[0],
          email,
          role: UserRole.CLIENTE,
          createdAt: new Date().toISOString(),
          isPlanActive: false
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="p-8">
          <button onClick={onBack} className="text-slate-400 hover:text-slate-900 mb-8 flex items-center gap-2 transition-colors">
            <i className="fas fa-chevron-left"></i> Voltar
          </button>
          
          <div className="text-center mb-10">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 text-white"
              style={{ backgroundColor: identity.primaryColor }}
            >
              <i className="fas fa-key"></i>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">{identity.name}</h2>
            <p className="text-slate-500">Acesse sua área restrita</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">E-mail</label>
              <div className="relative">
                <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-slate-500 outline-none transition-all"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-700">Senha</label>
                <button type="button" onClick={onResetPassword} className="text-xs font-bold text-slate-400 hover:text-slate-600">Esqueceu a senha?</button>
              </div>
              <div className="relative">
                <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-slate-500 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ backgroundColor: identity.primaryColor }}
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <>Entrar no Sistema <i className="fas fa-sign-in-alt"></i></>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-500">Ainda não tem conta? <button onClick={onRegister} className="font-bold hover:underline" style={{ color: identity.primaryColor }}>Cadastre-se aqui</button></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
