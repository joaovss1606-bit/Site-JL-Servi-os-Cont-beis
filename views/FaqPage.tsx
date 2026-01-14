import React, { useState } from 'react';
import { FaqItem, CompanyIdentity } from '../types.ts';

interface FaqPageProps {
  faqs: FaqItem[];
  identity: CompanyIdentity;
  onBack: () => void;
}

const FaqPage: React.FC<FaqPageProps> = ({ faqs, identity, onBack }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(faqs.map(f => f.category)));
  const filteredFaqs = faqs.filter(f => 
    f.isActive && 
    (search === '' || f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase())) &&
    (activeCategory === null || f.category === activeCategory)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <button onClick={onBack} className="text-slate-400 hover:text-slate-900 mb-8 flex items-center gap-2">
        <i className="fas fa-chevron-left"></i> Voltar ao Início
      </button>

      <div className="text-center mb-16">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Como podemos ajudar?</h1>
        <p className="text-slate-500">Tire suas dúvidas sobre nossos processos, segurança e planos.</p>
      </div>

      <div className="relative mb-12">
        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
        <input 
          type="text"
          placeholder="Busque por uma dúvida..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-2xl py-5 pl-12 pr-4 shadow-sm focus:ring-2 outline-none transition-all"
          style={{ '--tw-ring-color': identity.primaryColor } as any}
        />
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        <button 
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activeCategory === null ? 'text-white' : 'bg-white text-slate-500 border border-slate-200'}`}
          style={activeCategory === null ? { backgroundColor: identity.primaryColor } : {}}
        >
          Todas
        </button>
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${activeCategory === cat ? 'text-white' : 'bg-white text-slate-500 border border-slate-200'}`}
            style={activeCategory === cat ? { backgroundColor: identity.primaryColor } : {}}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <p className="text-center text-slate-400 py-10">Nenhuma pergunta encontrada para sua busca.</p>
        ) : (
          filteredFaqs.map(faq => (
            <details key={faq.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-sm">
              <summary className="list-none p-6 flex justify-between items-center cursor-pointer font-bold text-slate-900 group-open:bg-slate-50">
                {faq.question}
                <i className="fas fa-chevron-down text-slate-400 transition-transform group-open:rotate-180"></i>
              </summary>
              <div className="p-6 pt-0 text-slate-600 leading-relaxed text-sm border-t border-slate-50">
                {faq.answer}
              </div>
            </details>
          ))
        )}
      </div>
    </div>
  );
};

export default FaqPage;