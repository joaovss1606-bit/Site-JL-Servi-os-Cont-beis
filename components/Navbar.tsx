import React from 'react';
import { AuthState, UserRole, CompanyIdentity } from '../types.ts';

interface NavbarProps {
  auth: AuthState;
  onLogout: () => void;
  onNavigate: (view: any) => void;
  identity: CompanyIdentity;
}

const Navbar: React.FC<NavbarProps> = ({ auth, onLogout, onNavigate, identity }) => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('LANDING')}>
            {identity.logoUrl ? (
              <img src={identity.logoUrl} alt={identity.name} className="w-10 h-10 object-contain" />
            ) : (
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: identity.primaryColor }}
              >
                <i className="fas fa-balance-scale"></i>
              </div>
            )}
            <div>
              <span className="text-xl font-bold text-slate-900 block leading-none">{identity.name}</span>
              <span 
                className="text-[10px] font-semibold tracking-wider uppercase"
                style={{ color: identity.primaryColor }}
              >
                GESTÃO & LGPD
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {!auth.isAuthenticated ? (
              <>
                <button 
                  onClick={() => onNavigate('LOGIN')}
                  className="text-slate-600 hover:text-indigo-600 font-medium transition-colors text-sm"
                >
                  Entrar
                </button>
                <button 
                  onClick={() => onNavigate('REGISTER')}
                  className="text-white px-5 py-2 rounded-full font-semibold hover:opacity-90 transition-all shadow-sm text-sm"
                  style={{ backgroundColor: identity.primaryColor }}
                >
                  Criar Conta
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-semibold text-slate-800">{auth.user?.name}</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-tighter">
                    {auth.user?.role === UserRole.ADMIN ? 'Contador' : 'Cliente'}
                  </span>
                </div>
                <button 
                  onClick={onLogout}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all"
                  title="Sair"
                >
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;