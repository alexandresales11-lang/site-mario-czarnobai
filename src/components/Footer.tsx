import React from 'react';
import { Dumbbell, Phone, Instagram, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#040810] text-slate-400 border-t border-cyan-950 text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5">
                <div className="w-full h-full bg-[#070C16] rounded-[10px] flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <div className="font-display font-extrabold text-white text-base tracking-tight">
                  MÁRIO CZARNOBAI
                </div>
                <div className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase">
                  PERSONAL TRAINER
                </div>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Consultoria Online e Treinamento Personalizado de Alta Performance. Treine com foco, evolua sem limites.
            </p>
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Atendimento e Acompanhamento Global 🌎</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-3">Navegação</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-cyan-400 transition-colors">Início</a></li>
              <li><a href="#metodologia" className="hover:text-cyan-400 transition-colors">Metodologia do Treino</a></li>
              <li><a href="#resultados" className="hover:text-cyan-400 transition-colors">Galeria de Resultados</a></li>
              <li><a href="#agendamento" className="hover:text-cyan-400 transition-colors">Agendamento de Consultas</a></li>
              <li><a href="#depoimentos" className="hover:text-cyan-400 transition-colors">Depoimentos dos Alunos</a></li>
              <li><a href="#planos" className="hover:text-cyan-400 transition-colors">Planos e Preços</a></li>
              <li><a href="#calculadora" className="hover:text-cyan-400 transition-colors">Calculadora Fitness</a></li>
            </ul>
          </div>

          {/* Col 3: Contact & Social */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-3">Contato Direto</h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/5574999041988"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-slate-200 hover:text-cyan-400 transition-colors"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">WhatsApp Oficial</div>
                  <div className="font-bold text-sm">(74) 99904-1988</div>
                </div>
              </a>

              <a
                href="https://instagram.com/marioczarnobai_personal"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-slate-200 hover:text-cyan-400 transition-colors"
              >
                <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400">Instagram</div>
                  <div className="font-bold text-xs">@marioczarnobai_personal</div>
                </div>
              </a>
            </div>
          </div>

          {/* Col 4: Slogan & Quick CTA */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider">Metodologia Ativa</h4>
            <div className="p-4 rounded-xl bg-[#08101C] border border-cyan-900/40">
              <p className="text-xs text-cyan-300 font-script font-bold text-base">
                "Seu objetivo merece um plano de verdade!" 🔥💪
              </p>
              <a
                href="#agendamento"
                className="mt-3 block w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-[11px] text-white text-center rounded-lg uppercase tracking-wider hover:opacity-90"
              >
                Agendar Avaliação
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Mário Czarnobai Personal Trainer. Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Floating Sticky WhatsApp Button */}
      <a
        href="https://wa.me/5574999041988?text=Ol%C3%A1%20M%C3%A1rio!%20Vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20Consultoria%20Online."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 p-3 sm:px-4 sm:py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-emerald-300"
        aria-label="Falar no WhatsApp com Mário Czarnobai"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <Phone className="w-5 h-5 fill-current text-black" />
        <span className="hidden sm:inline font-black tracking-wider uppercase">Falar com Mário</span>
      </a>
    </footer>
  );
};
