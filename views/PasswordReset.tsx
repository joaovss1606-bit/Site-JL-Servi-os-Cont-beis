import React, { useState } from 'react';
import { CompanyIdentity } from '../types.ts';

interface PasswordResetProps {
  identity: CompanyIdentity;
  onBack: () => void;
}

const PasswordReset: React.FC<PasswordResetProps> = ({ identity, onBack }) => {
  const [step, setStep] = useState<'REQUEST' | 'VERIFY' | 'NEW_PASSWORD' | 'SUCCESS'>('REQUEST');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação: Envia código 123456 para o email
    setStep('VERIFY');
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === '123456') setStep('NEW_PASSWORD');
    else alert("Código inválido!");
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('SUCCESS');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-100 p-8">
        {step !== 'SUCCESS' && (
          <button onClick={onBack} className="text-slate-400 hover:text-slate-900 mb-8 flex items-center gap-2 transition-colors">
            <i className="fas fa-chevron-left"></i> Voltar
          </button>
        )}

        {step === 'REQUEST' && (
          <form onSubmit={handleRequest} className="space-y-6">
            <h2 className="text-2xl font-black">Recuperar Senha</h2>
            <p className="text-sm text-slate-500">Informe seu e-mail cadastrado para enviarmos um código de verificação.</p>
            <input 
              type="email" required placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 outline-none"
              style={{ '--tw-ring-color': identity.primaryColor } as any}
            />
            <button type="submit" className="w-full text-white py-4 rounded-xl font-bold" style={{ backgroundColor: identity.primaryColor }}>Enviar Código</button>
          </form>
        )}

        {step === 'VERIFY' && (
          <form onSubmit={handleVerify} className="space-y-6 text-center">
            <h2 className="text-2xl font-black">Código Enviado</h2>
            <p className="text-sm text-slate-500">Informe o código de 6 dígitos que enviamos para {email}.<br/><span className="text-xs italic">(Simulação: use 123456)</span></p>
            <input 
              type="text" required placeholder="000000" maxLength={6} value={code} onChange={e => setCode(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 text-center text-2xl font-black tracking-[1em] focus:ring-2 outline-none"
              style={{ '--tw-ring-color': identity.primaryColor } as any}
            />
            <button type="submit" className="w-full text-white py-4 rounded-xl font-bold" style={{ backgroundColor: identity.primaryColor }}>Validar Código</button>
          </form>
        )}

        {step === 'NEW_PASSWORD' && (
          <form onSubmit={handleReset} className="space-y-6">
            <h2 className="text-2xl font-black">Nova Senha</h2>
            <p className="text-sm text-slate-500">Crie uma nova senha segura para sua conta.</p>
            <input 
              type="password" required placeholder="••••••••" value={newPassword} onChange={e => setNewPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 outline-none"
              style={{ '--tw-ring-color': identity.primaryColor } as any}
            />
            <button type="submit" className="w-full text-white py-4 rounded-xl font-bold" style={{ backgroundColor: identity.primaryColor }}>Redefinir Senha</button>
          </form>
        )}

        {step === 'SUCCESS' && (
          <div className="text-center py-10 space-y-6">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto">
              <i className="fas fa-check"></i>
            </div>
            <h2 className="text-2xl font-black">Sucesso!</h2>
            <p className="text-slate-500">Sua senha foi redefinida. Você já pode acessar o portal.</p>
            <button onClick={onBack} className="w-full text-white py-4 rounded-xl font-bold" style={{ backgroundColor: identity.primaryColor }}>Ir para o Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordReset;