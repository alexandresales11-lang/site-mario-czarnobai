import React from 'react';
import { CONSULTANCY_PLANS } from '../data/mockData';
import { Check, ShieldCheck, Sparkles, Phone, Zap } from 'lucide-react';

export const Plans: React.FC = () => {
  return (
    <section id="planos" className="py-20 bg-[#070D18] relative overflow-hidden border-t border-cyan-950/60">
      
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest">
            <Zap className="w-4 h-4 text-amber-400" />
            Planos de Acompanhamento Online
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white uppercase tracking-tight">
            Escolha o Seu <span className="text-cyan-400">Plano de Transformação</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Acompanhamento 100% individualizado com o Personal Mário Czarnobai. Treine com foco e alcance resultados de verdade.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {CONSULTANCY_PLANS.map((plan) => {
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-b from-[#0F223D] via-[#0B1A2F] to-[#071120] border-2 border-cyan-400 shadow-[0_0_35px_rgba(0,180,255,0.25)] scale-105 z-20'
                    : 'bg-card-gradient border border-cyan-900/50 hover:border-cyan-500/40 shadow-xl'
                }`}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-extrabold text-[11px] uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div className="space-y-6 pt-2">
                  <div>
                    <h3 className="text-2xl font-display font-black text-white uppercase">{plan.title}</h3>
                    <p className="text-xs text-cyan-400 font-bold uppercase mt-1">{plan.duration}</p>
                  </div>

                  {/* Price Box */}
                  <div className="pb-6 border-b border-slate-800">
                    {plan.originalPrice && (
                      <div className="text-xs text-slate-500 line-through font-semibold">
                        De {plan.originalPrice}
                      </div>
                    )}
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-4xl sm:text-5xl font-display font-black text-white">{plan.price}</span>
                      <span className="text-xs text-slate-400 font-medium">{plan.periodLabel}</span>
                    </div>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">O que está incluso:</div>
                    <ul className="space-y-2.5 text-xs text-slate-200">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-8">
                  <a
                    href={`https://wa.me/5574999041988?text=Ol%C3%A1%20M%C3%A1rio!%20Quero%20me%20matricular%20no%20*${encodeURIComponent(plan.title)}*%20da%20Consultoria%20Online.`}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg text-center ${
                      plan.popular
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-black'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 text-white'
                    }`}
                  >
                    <Phone className="w-4 h-4 fill-current" />
                    <span>{plan.ctaText}</span>
                  </a>
                  <p className="text-[10px] text-slate-400 text-center mt-2">
                    Início imediato após confirmação
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Security & Guarantee Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-[#08101C] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <strong className="text-white block">Garantia de Satisfação & Qualidade:</strong>
              Acompanhamento próximo para você alcançar seu objetivo de forma segura.
            </div>
          </div>
          <a
            href="https://wa.me/5574999041988?text=Ol%C3%A1%20M%C3%A1rio!%20Tenho%20uma%20d%C3%BAvida%20sobre%20os%20planos."
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 font-bold hover:underline shrink-0"
          >
            Tirar dúvidas sobre os planos no WhatsApp →
          </a>
        </div>

      </div>
    </section>
  );
};
