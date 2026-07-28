import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-[#060B14] relative overflow-hidden border-t border-cyan-950/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest">
            <HelpCircle className="w-4 h-4" />
            Tire Suas Dúvidas
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-tight">
            Perguntas <span className="text-cyan-400">Frequentes</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Tudo o que você precisa saber sobre a consultoria e metodologia do Personal Mário Czarnobai.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0A1322] border border-cyan-900/40 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-bold text-sm sm:text-base text-white">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-cyan-500 text-black' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed pt-1 border-t border-slate-800/80 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct WhatsApp help link */}
        <div className="mt-10 text-center p-6 rounded-2xl bg-[#0A1322] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-300 text-left">
            <strong className="text-white block font-bold">Ainda tem alguma dúvida específica?</strong>
            Converse diretamente com o Mário no WhatsApp.
          </div>
          <a
            href="https://wa.me/5574999041988?text=Ol%C3%A1%20M%C3%A1rio!%20Tenho%20uma%20d%C3%BAvida%20espec%C3%ADfica%20sobre%20a%20consultoria."
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 font-bold text-xs flex items-center gap-2 hover:bg-emerald-600/30 transition-all shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar no WhatsApp (74) 99904-1988</span>
          </a>
        </div>

      </div>
    </section>
  );
};
